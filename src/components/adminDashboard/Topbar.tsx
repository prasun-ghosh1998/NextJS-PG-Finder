import { Mail } from "lucide-react";
import AdminProfile from "./AdminProfile";

export default function Topbar() {
  return (
    <div  className="flex flex-col gap-5 bg-zinc-900/60 p-5 shadow-lg lg:flex-row lg:items-center lg:justify-between">
<div>
        <h2 className="bg-gradient-to-b from-green-800 via-green-600 to-green-400 bg-clip-text text-4xl font-bold text-transparent">
          Admin Dashboard
        </h2>

        <p className="mt-2 text-gray-400">
          Manage your properties and inquiries.
        </p>
      </div>
      <div className="flex items-center gap-4 ms-auto">
        <Mail className="text-white" />
        <div className="flex items-center gap-2">
          <AdminProfile/>
        </div>
      </div>
    </div>
  );
}
