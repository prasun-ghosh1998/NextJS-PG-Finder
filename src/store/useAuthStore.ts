import { supabase } from "@/lib/supabaseclient";
import { AuthState } from "@/typescript/type/auth.type";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { create } from "zustand";

export const useAuthStorte = create<AuthState>((set) => ({
  isLoading: false,
  error: null,
  token: getCookie("token") as string || null,
  role: getCookie("role") as string || null,
  user: getCookie("user") ? JSON.parse(getCookie("user") as string) : null,
  success: false,

  setUser: (user) => {
  setCookie(
    "user",
    JSON.stringify(user),
    {
      maxAge: 24 * 7 * 60 * 60,
      path: "/",
    }
  );

  set({ user });
},

// Register

  registerUser: async (data) => {
    console.log("data coming in zustand", data);
  set({ isLoading: true, error: null });

  try {
    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

    if (authError) throw authError;
     console.log("authData", authData);


    const { data: registration, error: registrationError } =
      await supabase.from("registration").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        image: null,
        role: "user",
        auth_user_id: authData.user?.id,
      });

    if (registrationError) throw registrationError;

    set({ isLoading: false, error: null });

    return {
      success: true,
      message: "User Register Successfully",
    };
  } catch (err: any) {
    console.log("Register Error:", err);
    set({ isLoading: false, error: err.message || "Fail to register" });

    return {
      success: false,
      message: err.message || "Fail to register",
    };
  }
},

// Login

  loginUser: async (data) => {
     set({ isLoading: true, error: null });
    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
      if (authError) throw authError;
      console.log("authData", authData);
      const { data: profileData, error: profileError } = await supabase
        .from("registration")
        .select("*")
        .eq("auth_user_id", authData.user.id)
        .single();
      if (profileError) throw profileError;
      console.log("profileData", profileData);
      setCookie("token", authData.session.access_token,{
        maxAge: 24*7*60*60,
        path: "/"
      })
      setCookie("role", profileData.role,{
        maxAge: 24*7*60*60,
        path: "/"
      })
      setCookie("user", JSON.stringify(profileData),{
        maxAge: 24*7*60*60,
        path: "/"
      })
       set({ isLoading: false, error: null, token: authData.session.access_token, role: profileData.role, user: profileData });
      return {
        success: true,
        message: "User Login Successfully",
        user: profileData
      };
    } catch(err:any) {
        console.error("LOGIN ERROR:", err);
      set({ isLoading: false, error: "Fail to Login" });
      return {
        success: false,
        message: "Fail to Login",
      };
    }
  },

  //LogOut

  logout: async()=>{
    await supabase.auth.signOut();
    set({ token: null, role: null, user: null });
    deleteCookie("token");
    deleteCookie("role");
    deleteCookie("user");
    window.location.href = "/login"
  }
  
}));


