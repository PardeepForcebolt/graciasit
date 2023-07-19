import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Input from "../Common/input";
import Select from "../Common/select";
import axiosInstance from "../Axios";
import { useAuth } from "../Context/User";
import { dropdownItems } from "../../constant";
import { useNavigate } from "react-router-dom";

const ItemTypes = {
  CARD: "card",
};

const DraggableItem = ({ item }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { item },
  }));

  return <div ref={drag}>{item}</div>;
};

const FormDesignerDnD = ({
  onClickSave = (formState) => {},
  savedFormState = [],
}) => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [formState, setFormState] = useState({});

  useEffect(() => {
    if (savedFormState?.length > 0) {
      const fs = {}; // Building form State from savedFormState
      const savedDroppedItems = [];
      savedFormState?.map((item, index) => {
        if (item?.nodeType === "input") {
          savedDroppedItems.push(items[0]);
          fs["input" + index] = {
            name: "input" + index,
            value: item?.value,
            id: "input" + index,
            nodeType: "input",
          };
        }

        if (item?.nodeType === "select") {
          savedDroppedItems.push(items[1]);
          fs["select" + index] = {
            name: "select" + index,
            value: item?.value,
            id: "select" + index,
            nodeType: "select",
          };
        }
      });

      setDroppedItems(savedDroppedItems);
      setFormState(fs);
    }
  }, [savedFormState]);

  const onChange = (item) => {
    if (!formState[item?.id]) {
      setFormState((fs) => {
        return { ...fs, [item?.id]: item };
      });
    } else {
      setFormState((fs) => {
        fs[item?.id] = item;
        return fs;
      });
    }
  };

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: ({ item }) => {
      setDroppedItems((prevItems) => [...prevItems, item]);
    },
  }));

  const items = [
    <input disabled className="border p-2 w-full" />,
    <select disabled className="border w-full p-2" />,
  ];

  return (
    <div className="flex h-screen">
      <div className="w-60 flex flex-col gap-8 border-r-2 p-2">
        <h4 className="font-semibold">Elements</h4>
        {items.map((item, index) => {
          return <DraggableItem key={index} item={item} />;
        })}
      </div>
      <div className="w-full h-screen p-2">
        <div ref={drop} className="h-full flex flex-col">
          <h4 className="font-semibold mb-8">Form Design</h4>
          {droppedItems.map((item, index) => {
            if (item?.type === "input") {
              return (
                <DraggableItem
                  key={index}
                  item={
                    <Input
                      position={index}
                      name={"input" + index}
                      value={
                        formState["input" + index]
                          ? formState["input" + index]?.value
                          : ""
                      }
                      onChange={onChange}
                    />
                  }
                />
              );
            }
            if (item?.type === "select") {
              return (
                <DraggableItem
                  key={index}
                  item={
                    <Select
                      position={index}
                      name={"select" + index}
                      value={
                        formState["select" + index]
                          ? formState["select" + index]?.value
                          : ""
                      }
                      onChange={onChange}
                      dropdownItems={dropdownItems}
                    />
                  }
                />
              );
            }
            return (
              <div key={index} className="mb-4">
                {item}
              </div>
            );
          })}

          <div className="self-end mt-20">
            <button
              onClick={() => onClickSave(formState)}
              className="border p-1 px-6"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormDesigner = () => {
  const [savedForm, setSavedForm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && user?.role !== "admin") {
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

  const saveForm = async (payload) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance(
        "http://localhost:4000",
        accessToken
      ).post("/form/save", payload);
      setIsLoading(false);
      if (data?.form) {
        setSavedForm(payload);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onClickSave = (formState) => {
    const items = Object.values(formState)
      .sort((a, b) => {
        return a?.position - b?.position;
      })
      .map((item) => {
        return {
          position: item?.position,
          value: item?.value,
          nodeType: item?.nodeType,
        };
      });

    saveForm(items);
  };
  return (
    <DndProvider backend={HTML5Backend}>
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
      <FormDesignerDnD onClickSave={onClickSave} savedFormState={savedForm} />
    </DndProvider>
  );
};

export default FormDesigner;
