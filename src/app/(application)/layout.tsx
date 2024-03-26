import Sidebar from "../../components/Sidebar";
import NavHeader from "../../components/Dashboard/NavHeader";

export default function AppLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row flex-1 h-screen">
      <Sidebar></Sidebar>
      <div className="flex flex-col w-full relative">
        <NavHeader />
        {children}
      </div>
    </section>
  );
}
