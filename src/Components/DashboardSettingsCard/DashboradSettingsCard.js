import React, { useState, useEffect } from "react";
import "./DashboardSettingsCard.scss";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { DashboardSettingsApi } from "../../Api/AxiosApi";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

const DasboardSettingsCard = ({ title, icon, type }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changedItem, setChangedItem] = useState(null);
  const [allChnagedItems, setAllChangedItems] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleCheckChange = (e) => {
    setItems(
      items.map((item) => {
        if (item.itemName === e.target.name) {
          setChangedItem({
            prefrenceID: item.prefrenceID,
            checked: !item.checked,
          });
          return { ...item, checked: !item.checked };
        } else return item;
      })
    );
  };

  const getItems = async () => {
    try {
      setLoading(true);
      const { data: itemsResponse } = await DashboardSettingsApi.get(type);
      setItems(itemsResponse);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong while loading the data...");
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (changedItem) setAllChangedItems([...allChnagedItems, changedItem]);
  }, [changedItem]);

  const handleSave = async () => {
    try {
      setSubmitting(true);
      const { data: res } = await DashboardSettingsApi.update(allChnagedItems);
      toast.success("Updated successfully");
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      toast.error("Something went wrong! please try again later");
    }
  };

  return (
    <div className="card-container">
      {loading ? (
        <Loading />
      ) : (
        <div className="content-container">
          <div className="component-header-style card-header-container">
            {icon}
            <label>{title}</label>
          </div>
          <div className="checkboxes-container">
            {items.map((item) => (
              <FormGroup
                check
                className={item.checked ? "checked-style" : "unchecked-style"}
                key={item.itemName}
              >
                <Input
                  type="checkbox"
                  checked={item.checked}
                  onChange={handleCheckChange}
                  name={item.itemName}
                />
                <Label check>{item.itemName}</Label>
              </FormGroup>
            ))}
          </div>
        </div>
      )}
      <Button
        color="primary"
        onClick={handleSave}
        disabled={loading}
        style={{ display: "flex", justifyContent: "center" }}
      >
        {loading || submitting ? (
          <Loading
            style={{ width: "1.5rem", height: "1.5rem" }}
            padding={false}
          />
        ) : (
          "Save"
        )}
      </Button>
    </div>
  );
};

export default DasboardSettingsCard;
