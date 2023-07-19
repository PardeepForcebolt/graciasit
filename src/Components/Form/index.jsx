import { useEffect, useState } from "react";
import { useAuth } from "../Context/User";
import axiosInstance from "../Axios";
import Select from "../Common/select";
import { dropdownItems } from "../../constant";
import Input from "../Common/input";
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const [savedForm, setSavedForm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && user?.role !== "regular") {
      navigate("/dashboard");
    }
  }, [user]);
  
  useEffect(() => {
    if (accessToken) {
      fetchSavedForm();
    }
  }, [accessToken]);

  const fetchSavedForm = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance(
        "http://localhost:4000",
        accessToken
      ).get("/form/get");
      setIsLoading(false);
      if (data?.form) {
        setSavedForm(data?.form);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-4 flex flex-col">
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

      <h2 className="text-lg font-semibold">Form</h2>

      {savedForm?.map((item, index) => {
        if (item?.nodeType === "input") {
          return (
            <Input
              position={index}
              name={"input" + index}
              value={item?.value}
              disabled
            />
          );
        }
        if (item?.nodeType === "select") {
          return (
            <Select
              position={index}
              name={"select" + index}
              value={item?.value}
              disabled
              dropdownItems={dropdownItems}
            />
          );
        }
      })}
    </div>
  );
};

export default FormPage;
