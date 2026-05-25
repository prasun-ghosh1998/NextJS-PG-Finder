import { Mail } from "lucide-react";
import AdminProfile from "./AdminProfile";

export default function Topbar() {
  return (
    <div className="flex justify-between items-center mb-6 ms-auto">

      <div className="flex items-center gap-4">
        <Mail className="text-white" />
        <div className="flex items-center gap-2">
          <AdminProfile/>
        </div>
      </div>
    </div>
  );
}
