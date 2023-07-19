import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/User";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center p-4 gap-8 m-auto items-center">
      <h2 className="text-lg font-semibold">Welcome {user?.name}</h2>

      <div className="flex flex-col gap-8">
        <button onClick={() => navigate("/dashboard")} className="p-2 border">
          Dashboard
        </button>
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/form-designer")}
            className="p-2 border"
          >
            Form Designer
          </button>
        )}
        {user?.role === "regular" && (
          <button onClick={() => navigate("/form")} className="p-2 border">
            Form
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
