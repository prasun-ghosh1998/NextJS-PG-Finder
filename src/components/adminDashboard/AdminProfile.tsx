"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabaseclient";

function AdminProfile() {
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const getAdmin = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.log(error.message);
        return;
      }

      setAdmin(user);
    };

    getAdmin();
  }, []);

  return (
    <div className="flex items-center gap-2">

      <div>
        <p className="text-sm font-semibold text-green-600">
          {admin?.user_metadata?.name || "Admin"}
        </p>

        <p className="text-xs text-green-600">
          {admin?.email}
        </p>
      </div>
    </div>
  );
}

export default AdminProfile;