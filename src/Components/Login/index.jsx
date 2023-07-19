import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/User";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    error: false,
    message: "",
  });
  const { signin, user } = useAuth();

  const onChange = (e) => {
    setFormState((fs) => {
      return {
        ...fs,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setFormError({
        error: false,
        message: "",
      });
      if (!formState.email || !formState.password) {
        return;
      }
      const data = await signin(formState);

      if (data?.error) {
        setFormError(data);
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col h-full gap-10 border border-1 w-2/4 my-10 m-auto items-center justify-between p-4">
      <h2 className="text-2xl font-semibold">Login</h2>
      {formError?.error && formError?.message && <p> {formError?.message} </p>}
      <form onSubmit={onSubmit}>
        <div>
          <input
            name="email"
            type="email"
            value={formState.email}
            onChange={onChange}
            className="p-2 border mb-5"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            value={formState.password}
            onChange={onChange}
            className="p-2 border"
          />
        </div>

        <div>
          <button type="submit" className="p-2 px-4 border mt-4">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
