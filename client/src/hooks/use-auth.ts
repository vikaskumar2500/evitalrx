import { create } from "zustand";
import axios from "@/lib/axios";
import { toast } from "sonner";

interface User {
  name: string;
  email: string;
  mobile: string;
  address: string;
  dob: string;
  gender: string;
  id: string;
  isVerified: boolean;
}
interface LoginProps {
  credential: string;
  password: string;
}

interface forgotPasswordProps {
  credential: string;
  password: string;
}

interface ResetPasswordProps {
  credential: string;
  password: string;
  newPassword: string;
}

// enum GenderProps {
//   "M",
//   "F",
//   "O",
// }

interface SignupProps {
  name: string;
  mobile: string;
  email: string;
  address: string;
  dob: string;
  gender: string;
  password: string;
}

interface CreateMethods {
  user: User | null;
  loading: boolean;
  login: (user: LoginProps) => Promise<void>;
  signup: (user: SignupProps) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (user: User) => Promise<void>;
  forgotPassword: (data: forgotPasswordProps) => Promise<void>;
  resetPassword: (data: ResetPasswordProps) => Promise<void>;
}

export const useAuth = create<CreateMethods>()((set) => ({
  user: null,
  loading: false,
  login: async (data: LoginProps) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", data);
      set({ user: { ...res.data, _id: res.data._id.toString() } });
      toast.success("LoggedIn successfully");
    } catch (e: any) {
      console.log("e", e);
      console.log("Error while logging", e.message);
      toast.error(e.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
  signup: async (data: SignupProps) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/signup", data);
      set({ user: { ...res.data, _id: res.data._id.toString() } });
      toast.success("Your account has been created successfully");
    } catch (e: any) {
      console.log("Error while logging", e.message);
      toast.error(e.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    set({ loading: false });
    try {
      const res = await axios.get("/auth/logout");
      set({ user: null });
      toast.success(res.data.message);
    } catch (e: any) {
      console.log("Error while logout", e.message);
      toast.error(e.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
  forgotPassword: async (data: forgotPasswordProps) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/forgot-password", data);
      set({ user: { ...res.data, password: data.password } });
    } catch (e: any) {
      console.log("Error in forgot password", e.message);
      toast.error(e.response.data.message);
    } finally {
      set({ loading: false });
    }
  },
  resetPassword: async (data: ResetPasswordProps) => {
    try {
      const res = await axios.post("/auth/reset-password", data);
      set({ user: { ...res.data, password: data.newPassword } });
    } catch (e: any) {
      console.log("Error in reset password", e.message);
      toast.error(e.response.data.message);
    }
  },
  updateProfile: async (data: User) => {
    try {
      const res = await axios.post("/auth/update-profile", data);
      set({ user: res.data });
    } catch (e: any) {
      console.log("Error in update profile", e.message);
      toast.error(e.response.data.message);
    }
  },
}));
