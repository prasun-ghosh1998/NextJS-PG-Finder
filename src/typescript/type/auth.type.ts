export type RegisterFormValues = {
  name: string;
  email: string;
  phone: string;
  role?: string;
  password: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type User = {
  auth_user_id?: string;
  created_at?: string;
  email?: string;
  id?: string;
  name?: string;
  phone?: string;
  role?: string;
};
export type AuthState = {
  isLoading: boolean;
  error: string | null;
  token: string | null;
  role: string | null;
  user: User | null;
  success: boolean;
  registerUser: (data: RegisterFormValues) => Promise<any>;
  loginUser: (data: LoginFormValues) => Promise<any>;
  logout: ()=> void;
  setUser: (user: User | null) => void;
};
