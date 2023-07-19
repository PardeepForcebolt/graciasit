import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../Axios";

const AuthContext = createContext({
  isLoading: false,
  accessToken: null,
  signout: () => {},
  signin: (payload) => {},
  setAccessToken: (token) => {},
  setIsLoading: (loading) => {},
  getUser: () => {},
  user: null,
});

const AuthState = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const signin = async (payload) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance("http://localhost:4000", "").post(
        "/auth/login",
        payload
      );
      if (data?.access_token) {
        localStorage.setItem("access_token", data?.access_token);
        setAccessToken(data?.access_token);
        getUser(data?.access_token);
        return data;
      }
      setIsLoading(false);
      return data;
    } catch (error) {
      setIsLoading(false);
      return {
        error: true,
        message: error?.response?.data?.message || "Something Went Wrong",
      };
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
      getUser(token);
    } 
  }, []);

  const signout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.clear();
    window.location = "/";
  };

  const getUser = async (access_token) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance(
        "http://localhost:4000",
        access_token
      ).get("/auth/userinfo");
      setIsLoading(false);
      if (data?.userinfo) {
        setUser(data?.userinfo);
      }
      return data;
    } catch (error) {
      setIsLoading(false);
      window.location = "/";
      localStorage.removeItem("access_token");
      return {
        error: true,
        message: error?.response?.data?.message || "Something Went Wrong",
      };
    }
  };

  return {
    isLoading,
    accessToken,
    signin,
    signout,
    setAccessToken,
    setIsLoading,
    getUser,
    user,
  };
};

export const AuthContextProvider = ({ children }) => {
  const values = AuthState();

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
