import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteLoader from "@/components/SiteLoader";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteLoader />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
