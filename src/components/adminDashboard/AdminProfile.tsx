// "use client";

// import { useEffect, useState } from "react";

// import { supabase } from "@/lib/supabaseclient";

// function AdminProfile() {
//   const [admin, setAdmin] = useState<any>(null);

//   useEffect(() => {
//     const getAdmin = async () => {
//       const {
//         data: { user },
//         error,
//       } = await supabase.auth.getUser();

//       if (error) {
//         console.log(error.message);
//         return;
//       }

//       setAdmin(user);
//     };

//     getAdmin();
//   }, []);

//   return (
    // <div className="flex items-center gap-2">

    //   <div>
    //     <p className="text-sm font-semibold text-green-600">
    //       {admin?.user_metadata?.name || "Admin"}
    //     </p>

    //     <p className="text-xs text-green-600">
    //       {admin?.email}
    //     </p>
    //   </div>
    // </div>
   
//   );
// }

// export default AdminProfile;

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

  const adminName =
    admin?.user_metadata?.name ||
    admin?.user_metadata?.full_name ||
    "Admin";

  const adminEmail =
    admin?.user_metadata?.email || "Admin";

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-zinc-950 px-4 py-2">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 font-bold uppercase text-white">
        {adminName?.charAt(0)}
      </div>

      <div>
        <h4 className="font-semibold text-white">
          {adminName}
        </h4>

        <p className="text-sm text-gray-400">
          {adminEmail}
        </p>
      </div>
    </div>
  );
}

export default AdminProfile;