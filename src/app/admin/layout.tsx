
import Sidebar from "@/components/adminDashboard/Sidebar";
import Topbar from "@/components/adminDashboard/Topbar";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex-1 flex flex-col bg-[#373838] ">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}