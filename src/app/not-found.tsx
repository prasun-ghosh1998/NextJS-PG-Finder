import Link from "next/link";
import { Building2, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100 px-5">
      <div className="w-full max-w-xl rounded-[32px] border border-green-100 bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-green-500 to-emerald-700 shadow-xl">
          <SearchX className="h-11 w-11 text-white" />
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <Building2 className="text-green-700" size={28} />
          <h2 className="bg-gradient-to-b from-green-800 via-green-600 to-green-400 bg-clip-text text-3xl font-extrabold text-transparent">
            PGFinder+
          </h2>
        </div>

        <h1 className="mt-6 text-7xl font-black text-green-700">
          404
        </h1>

        <p className="mt-3 text-lg font-semibold text-gray-800">
          This PG page is not available
        </p>

        <p className="mt-2 text-sm text-gray-500">
          The property or page you are looking for may have been removed.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
        >
          <Home size={18} />
          Back to PGFinder+
        </Link>
      </div>
    </div>
  );
}