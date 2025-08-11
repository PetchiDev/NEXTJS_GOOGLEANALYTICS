import { atom } from "jotai";

export const mapAtom = atom<
  | {
      zoomLevel: number;
      bottomRightLat: number;
      bottomRightLon: number;
      topLeftLat: number;
      topLeftLon: number;
    }
  | undefined
>();
