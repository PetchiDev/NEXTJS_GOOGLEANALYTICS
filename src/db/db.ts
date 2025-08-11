import {
  addRxPlugin,
  createRxDatabase,
  defaultConflictHandler,
  removeRxDatabase,
  RxConflictHandler,
  RxDatabase,
  RxJsonSchema,
} from "rxdb";
import { RxDBCleanupPlugin } from "rxdb/plugins/cleanup";
import { RxDBLeaderElectionPlugin } from "rxdb/plugins/leader-election";
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { APP_PREFIX, config } from "../constants";

addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBCleanupPlugin);
addRxPlugin(RxDBMigrationSchemaPlugin);
addRxPlugin(RxDBQueryBuilderPlugin);

const dbName = `ql${APP_PREFIX}_${config.ql_env}`;

export interface IBaseDB {
  [key: string]: {
    schema: RxJsonSchema<unknown>;
    migrationStrategies: Record<number, (doc: unknown) => unknown | null>;
  };
}

export type IBase = Parameters<RxDatabase["addCollections"]>[0];

export const createEmptyMigrations = (schemaVersion: number) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const migrationStrategies: Record<number, (oldDoc: any) => any> = {};

  for (let i = 1; i <= schemaVersion; i++) {
    /**
     * this removes all documents from version 1
     * they will not appear in the new collection
     */
    migrationStrategies[i] = function () {
      return null;
    };
  }
  return migrationStrategies;
};

let dataBase: RxDatabase | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let initPromise: Promise<RxDatabase<any>> | null = null;

async function _createDatabase<T extends IBaseDB>(
  collections: T
): Promise<RxDatabase> {
  dataBase = await createRxDatabase({
    name: dbName,
    storage: getRxStorageDexie(),
    allowSlowCount: true,
    ignoreDuplicate: true,
  });

  if (dataBase) {
    await dataBase.addCollections(collections);
  }
  return dataBase;
}

export async function createDatabase<T extends IBaseDB>(
  collections: T
): Promise<RxDatabase> {
  if (Object.keys(collections).length === 0) {
    throw new Error("No collections found.");
  }
  if (!dataBase) {
    try {
      Object.keys(collections).forEach((collectionName) => {
        collections[collectionName].migrationStrategies = createEmptyMigrations(
          collections[collectionName].schema?.version || 1
        );
      });
      return _createDatabase(collections);
    } catch (error) {
      console.error("Error creating database:", error);
      try {
        await deleteExistingDatabase();
        return _createDatabase(collections);
      } catch (error) {
        console.error("Error retry database creation:", error);
        throw error;
      }
    }
  }

  return dataBase;
}

export async function checkMigrationNeeded(): Promise<boolean> {
  try {
    if (!dataBase) return false;

    for (const collection of Object.values(dataBase.collections)) {
      const needsMigration = await collection.migrationNeeded();
      if (needsMigration) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Error checking migration:", error);
    return true;
  }
}

export async function deleteExistingDatabase(): Promise<void> {
  try {
    await removeRxDatabase(dbName, getRxStorageDexie());
    dataBase = null;
    initPromise = null;
  } catch (error) {
    console.error("Error deleting database:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete database: ${error.message}`);
    } else {
      throw new Error("Failed to delete database: Unknown error");
    }
  }
}

// Clear all existing databases that we have previously created
function removePreviousDatabase() {
  try {
    removeRxDatabase(`ql${APP_PREFIX}`, getRxStorageDexie());
    removeRxDatabase(`ql${APP_PREFIX}_v1`, getRxStorageDexie());
  } catch (err) {
    console.error("Error removing previous databases:", err);
    // Ignore errors, as this is just a cleanup step
  }
}

export const initializeDatabase = async <T extends IBaseDB>(
  collections: T,
  removeDBIfMigrationNeeded = false
): Promise<RxDatabase<T>> => {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      const db = await createDatabase(collections);
      if (removeDBIfMigrationNeeded) {
        // Check if migration is needed
        const migrationNeeded = await checkMigrationNeeded();
        if (migrationNeeded) {
          // Delete existing database if migration needed
          await deleteExistingDatabase();
          return createDatabase(collections);
        }
      }
      removePreviousDatabase();
      return db;
    } catch (error) {
      console.error("Database initialization failed:", error);
      initPromise = null;
      throw error;
    }
  })();

  return initPromise;
};

export async function clearCollection(collectionName: string): Promise<void> {
  try {
    if (!dataBase) {
      throw new Error("Database is not initialized.");
    }

    const collection = dataBase.collections[collectionName];
    if (!collection) {
      throw new Error(`Collection ${collectionName} does not exist.`);
    }

    // Fetch all documents
    const docs = await collection.find().exec();
    if (docs.length > 0) {
      // Remove each document using its latest revision
      await Promise.all(docs.map((doc) => doc.remove()));
    }
  } catch (error) {
    console.error(`Error clearing collection ${collectionName}:`, error);
  }
}

export async function clearAllCollections(): Promise<void> {
  try {
    if (!dataBase) {
      throw new Error("Database is not initialized.");
    }

    await Promise.all(
      Object.values(dataBase.collections).map((collection) =>
        collection.find().remove()
      )
    );
  } catch (error) {
    console.error("Error clearing all collections:", error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const conflictHandler = (i: any, context: any) => {
  if (context === "downstream-check-if-equal-1") {
    Object.keys(i.newDocumentState).forEach((k) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      i.realMasterState[k] = i.realMasterState[k] ?? i.newDocumentState[k];
    });
    return Promise.resolve({
      isEqual: false,
      documentData: i.realMasterState,
    });
  }
  // return defaultConflictHandler(i, context);
  return undefined;
};
