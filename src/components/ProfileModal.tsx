"use client";

import { useEffect, useState } from "react";
import { Camera, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseclient";
import { useAuthStorte } from "@/store/useAuthStore";

interface ProfileModalProps {
  open: boolean;
  onClose?: () => void;
}

export default function ProfileModal({ open, onClose }: ProfileModalProps) {
  const { setUser, logout } = useAuthStorte();

  const [profile, setProfile] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.log("Auth user not found");
      return;
    }

    const { data, error } = await supabase
      .from("registration")
      .select("*")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Fetch Profile Error:", error);
      return;
    }

    if (!data) {
      console.log("No registration row found for this user");
      return;
    }

    setProfile(data);
    setPreview(data.image || null);
    setUser(data);
  };

  useEffect(() => {
    if (open) {
      fetchProfile();
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateProfile = async () => {
    if (!profile) return;

    setUpdating(true);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.log("Auth user not found", authError);
      setUpdating(false);
      return;
    }

    const { data, error } = await supabase
      .from("registration")
      .update({
        name: profile.name,
        phone: profile.phone,
      })
      .eq("auth_user_id", user.id)
      .select("*")
      .single();

    if (error) {
      console.error("Update Profile Error:", error);
      alert(error.message);
      setUpdating(false);
      return;
    }

    setProfile(data);
    setUser(data);

    setUpdating(false);
    alert("Profile updated successfully");
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.log("Auth user not found");
      setUploading(false);
      return;
    }

    const fileName = `${user.id}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("profile")
      .upload(fileName, file, {
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload Error:", uploadError);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("profile").getPublicUrl(fileName);

    const { error: updateError } = await supabase
      .from("registration")
      .update({
        image: publicUrl,
      })
      .eq("auth_user_id", user.id);

    if (updateError) {
      console.error("Update Error:", updateError);
      setUploading(false);
      return;
    }

    const updatedProfile = {
      ...profile,
      image: publicUrl,
    };

    setProfile(updatedProfile);
    setPreview(publicUrl);
    setUser(updatedProfile);
    setUploading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-[600px] overflow-hidden rounded-[32px] border-0 bg-white p-0">
        <div className="relative h-25 bg-gradient-to-r from-green-800 to-green-400">
          <DialogTitle className="absolute bottom-6 left-8 text-3xl font-bold text-white">
            My Profile
          </DialogTitle>
        </div>

        <div className="p-8">
          <div className="mb-8 flex justify-center">
            <label className="relative cursor-pointer">
              <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-green-500 bg-gray-100">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-green-100 text-4xl font-bold text-green-700">
                    {profile?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
              </div>

              <div className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow-lg">
                <Camera size={18} />
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={uploadImage}
              />
            </label>
          </div>

          {uploading && (
            <p className="mb-4 text-center text-sm font-semibold text-green-600">
              Uploading image...
            </p>
          )}

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={profile?.name || ""}
                onChange={handleChange}
                className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-4 outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                value={profile?.email || ""}
                readOnly
                className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={profile?.phone || ""}
                onChange={handleChange}
                className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-4 outline-none focus:border-green-500"
              />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={updateProfile}
              disabled={updating}
              className=" h-14 w-full rounded-2xl bg-gradient-to-r from-green-700 to-green-500 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>

            <button
              type="button"
              onClick={logout}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500 text-white transition hover:bg-red-600"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
