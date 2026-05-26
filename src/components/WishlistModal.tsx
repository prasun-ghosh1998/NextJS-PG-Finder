"use client";

import { useEffect, useState } from "react";
import { X, Heart } from "lucide-react";
import { supabase } from "@/lib/supabaseclient";

export default function WishlistModal({ open, onClose }: any) {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchWishlist();
    }
  }, [open]);

  const fetchWishlist = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("wishlist")
      .select(`
        id,
        property_id,
        property (*)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Wishlist fetch error:", error);
      setLoading(false);
      return;
    }

    setWishlist(data || []);
    setLoading(false);
  };

  const removeWishlist = async (wishlistId: string) => {
    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("id", wishlistId);

    if (error) {
      console.log("Wishlist remove error:", error);
      return;
    }

    setWishlist((prev) => prev.filter((item) => item.id !== wishlistId));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-3xl rounded-3xl bg-green-100 p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-gray-100 p-2 hover:bg-gray-200"
        >
          <X size={20} />
        </button>

        <div className="mb-5 flex items-center gap-2">
          <Heart className="h-6 w-6 fill-green-500 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-800">My Wishlist</h2>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : wishlist.length === 0 ? (
          <p className="text-gray-500">No wishlist property found.</p>
        ) : (
          <div className="max-h-[500px] overflow-y-auto rounded-2xl bg-white">
  <table className="w-full text-sm">
    <thead className="sticky top-0 bg-green-600 text-white">
      <tr>
        <th className="px-4 py-3 text-left">Image</th>
        <th className="px-4 py-3 text-left">Property</th>
        <th className="px-4 py-3 text-left">Location</th>
        <th className="px-4 py-3 text-left">Owner</th>
        <th className="px-4 py-3 text-left">Price</th>
        <th className="px-4 py-3 text-center">Action</th>
      </tr>
    </thead>

    <tbody>
      {wishlist.map((wish) => {
        const property = wish.property;

        return (
          <tr key={wish.id} className="border-b hover:bg-green-50">
            <td className="px-4 py-3">
              <img
                src={property?.image || "/placeholder.jpg"}
                alt={property?.title}
                className="h-16 w-20 rounded-xl object-cover"
              />
            </td>

            <td className="px-4 py-3 font-semibold text-gray-800">
              {property?.title}
            </td>

            <td className="px-4 py-3 text-gray-600">
              {property?.location}
            </td>

            <td className="px-4 py-3 text-gray-600">
              {property?.name}
            </td>

            <td className="px-4 py-3 font-bold text-green-700">
              ₹{property?.price}
            </td>

            <td className="px-4 py-3 text-center">
              <button
                onClick={() => removeWishlist(wish.id)}
                className="rounded-full border border-green-500 px-4 py-2 text-xs text-green-600 hover:bg-green-600 hover:text-white"
              >
                Remove
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
        )}
      </div>
    </div>
  );
}