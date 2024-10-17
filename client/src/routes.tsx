import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login.page";
import HomePage from "./pages/home.page";
import SignupPage from "./pages/signup.page";
import ResetPassword from "./pages/reset-password.page";
import ForgotPassword from "./pages/forgot-password.page";
import UpdateProfile from "./pages/update-profile.page";
import AuthPage from "./pages/auth.page";

export const RouteHanler = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="update-profile" element={<UpdateProfile />} />
      </Route>
    </Routes>
  );
};
