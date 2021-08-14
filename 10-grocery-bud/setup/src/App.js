import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import uuid from "react-uuid";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  useEffect(() => {
    let alertTimer = setTimeout(() => {
      setAlert({ show: false, type: "", msg: "" });
    }, 3000);
    return () => clearTimeout(alertTimer);
  }, [alert]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //display alert
      setAlert({ show: true, msg: "please enter value", type: "danger" });
    } else if (name && isEditing) {
      //deal with edit
      setAlert({
        show: true,
        msg: "Successfully  Updated Value",
        type: "success",
      });
      const newList = list.filter((item) => item.id !== editID);
      const newUpdate = { id: editID, title: name };
      setList([...newList, newUpdate]);
      setIsEditing(false);
      setEditID(null);
      setName("");
    } else {
      setAlert({ show: true, msg: "Successfully Added Item", type: "success" });
      const newItem = { id: uuid(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const clearItems = () => {
    setAlert({ show: true, msg: "All Items Deleted", type: "danger" });
    setList([]);
  };

  const removeItem = (id) => {
    setAlert({ show: true, msg: "Item Successfuly deleted", type: "danger" });
    const newItems = list.filter((item) => item.id !== id);
    setList(newItems);
  };

  const editItem = (id) => {
    const selectedItem = list.find((item) => item.id === id);
    setName(selectedItem.title);
    setIsEditing(true);
    setEditID(id);
  };

  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert {...alert} />}
        <h3>Languages Reminder</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g C#"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearItems}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
