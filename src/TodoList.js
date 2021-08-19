import React, { useState,useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";

const getLocalData = ()=>{
  const list = localStorage.getItem("toDoList")
  if(list){
    return JSON.parse(list);
  }else {
    return []
  }
}

function TodoList() {
  const [myList, setMyList] = useState();

  const [Item, setItem] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState()
  const [toggleButton, setToggleButton] = useState(false);

  const changeIt = (event) => {
    setMyList(event.target.value);
  };

  const clickIt = () => {
    if (!myList) {
      alert("please fill the form");
    } else {
      const newInputData = {
        id: new Date().getTime().toString(),
        name: myList,
      };
      setItem((oldItem) => {
        return [...oldItem, newInputData];
      });
      setMyList("");
    }
  };

  const deleteItem = (index) => {
    const updatedItem = Item.filter((curEl) => {
      return curEl.id !== index;
    });
    setItem(updatedItem);
  };
  const editItem = (index) => {
    const addedToList = Item.find((curEl) => {
  return curEl.id === index;
    })
    setMyList(addedToList.name);
   setIsEditItem(index);
   setToggleButton(true);
  };

  const removeAll = () => {
    setItem([]);
  };

useEffect(() => {
localStorage.setItem("toDoList", JSON.stringify(Item))
},[Item])

  return (
    <div className="container">
      <div className="both">
        <div className="start"></div>
        <h3>ToDo List</h3>
      </div>
      <div className="allInput">
        <div className="awesome">
          <input
            type="text"
            placeholder="Add Item"
            className="putting"
            onChange={changeIt}
            value={myList}
          />
        </div>
        <div className="addTo">
          <AiOutlinePlus className="addCl" onClick={clickIt} />
        </div>
      </div>
      <div className="divMap">
        {Item.map((curEl) => {
          return (
            <div className="forCheck" key={curEl.id}>
              <div className="special">{curEl.name}</div>
              <div className="todo">
                <div className="edit">
                  <AiTwotoneEdit onClick={() => editItem(curEl.id)} />
                </div>
                <div className="delete">
                  <RiDeleteBin5Line onClick={() => deleteItem(curEl.id)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={removeAll} className="removing">
        Remove All
      </button>
    </div>
  );
}

export default TodoList;
