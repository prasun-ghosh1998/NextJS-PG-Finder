import { Building2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100">
      <div className="text-center">
        <div className="mx-auto flex h-24 w-24 animate-bounce items-center justify-center rounded-3xl bg-gradient-to-br from-green-500 to-emerald-700 shadow-2xl">
          <Building2 className="h-11 w-11 text-white" />
        </div>

        <h1 className="mt-7 bg-gradient-to-b from-green-800 via-green-600 to-green-400 bg-clip-text text-4xl font-extrabold text-transparent">
          PGFinder+
        </h1>

        <p className="mt-3 text-sm font-medium text-gray-500">
          Finding the best PG for you...
        </p>

        <div className="mx-auto mt-6 h-2 w-60 overflow-hidden rounded-full bg-green-100">
          <div className="h-full w-1/2 animate-[pgload_1.4s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-green-400 to-emerald-700" />
        </div>
      </div>
    </div>
  );
}