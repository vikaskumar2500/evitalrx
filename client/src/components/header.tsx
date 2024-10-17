import { useAuth } from "@/hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };
  return (
    <header className="sticky flex flex-row justify-between z-20 bg-gray-100/95 items-center px-10 border-b-2 top-0 left-0 w-full h-14">
      <Link to="/" className="font-bold text-2xl">
        EVITALRX
      </Link>
      <nav className="flex gap-2 text-blue-600">
        <Link to={"/auth/update-profile"} className="hover:underline">
          Update Profile
        </Link>
        {!user && (
          <Link to={"/auth/signup"} className="hover:underline">
            Signup
          </Link>
        )}
        {!user && (
          <Link to={"/auth/login"} className="hover:underline">
            Login
          </Link>
        )}
        {user && (
          <Button onClick={handleLogout} className="hover:underline">
            Logout
          </Button>
        )}
        <Link to={"/auth/reset-password"} className="hover:underline">
          Reset Password
        </Link>
      </nav>
    </header>
  );
};

export default Header;
