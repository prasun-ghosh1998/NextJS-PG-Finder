

import Sidebar from "@/components/ownerDashboard/Sidebar";
import Topbar from "@/components/ownerDashboard/Topbar";


export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<div className="flex h-screen ">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-[#373838] p-6">
        <Topbar />

        <div className="p-6 overflow-y-auto flex-1">
          
          {children}
        </div>
      </div>
    </div>
  );
}