import RootLayout, {
  generateStaticParams as rootGenerateStaticParams,
  RootLayoutProps,
  metadata as rootMetaData,
  viewport as rootViewport,
} from "@/layouts/root";
import "./globals.css";
import 'leaflet/dist/leaflet.css';


export const metadata = rootMetaData;
export const generateStaticParams = rootGenerateStaticParams;
export const viewport = rootViewport;

const Layout = ({ children, params }: Readonly<RootLayoutProps>) => {
  return <RootLayout params={params}>{children}</RootLayout>;
};
export default Layout;
