import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="flex items-center justify-center flex-col mt-12 w-full">
      <Outlet />
    </div>
  );
};

export default AuthPage;
