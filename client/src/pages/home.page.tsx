import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/auth/login");
  }, []);

  return (
    <>
      {user && (
        <section className="flex items-center justify-center">
          <h2 className="font-bold font-serif text-4xl">
            WELECOME TO EVILTALRX
          </h2>
        </section>
      )}
    </>
  );
};

export default HomePage;
