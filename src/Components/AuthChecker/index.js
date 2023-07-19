import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/User";

const AuthChecker = ({ children }) => {
  const { isLoading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      {isLoading && (
        <div
          className="fixed left-0 top-0 right-0 bottom-0 w-full h-screen flex justify-center items-center"
          style={{
            backgroundColor: "rgba(241, 243, 249, 0.5)",
            zIndex: 999,
          }}
        >
          Loading
        </div>
      )}
      {children}
    </>
  );
};

export default AuthChecker;
