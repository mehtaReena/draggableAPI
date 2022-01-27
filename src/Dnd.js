import React, { useState } from "react";
import "./Dnd.scss";

export default function Dnd() {
  // Initial groups to drag between
  const groups = ["group1", "group2", "group3", "noDrop"];
  // Initial items to be dragged
  const initialItems = [
    { id: 1, group: "group1", value: "drag 1" },
    { id: 2, group: "group1", value: "drag 2" },
    { id: 3, group: "group1", value: "drag 3" }
  ];
  // Sets the state of the items.
  // Can be used to add items
  const [items, setItems] = useState(initialItems);
  // Data about a things id, origin, and destination
  const [dragData, setDragData] = useState({});
  // Are we hovering over the noDrop div?
  const [noDrop, setNoDrop] = useState("");

  // Add a new item to `items`
  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      group: "group1",
      value: `drag ${items.length + 1}`
    };
    const newItems = [...items, newItem];
    setItems(newItems);
  };

  const reset = () => {
    setItems(initialItems);
  };

  // onDragStart we setDragData.
  // useState instead of e.dataTransfer so we can transfer more data
  const handleDragStart = (e, id, group) => {
    setDragData({ id: id, initialGroup: group });
  };

  // If we enter the noDrop zone the state will be updated
  // Used for styling.
  const handleDragEnter = (e, group) => {
    if (group === "noDrop") {
      setNoDrop("noDrop");
    }
  };

  // DND will not work without this.
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // setNoDrop to nothing to return styling to normal
  const handleDragLeave = (e) => {
    setNoDrop("");
  };

  // 1. makes copy of items (newItems)
  // 2. changes category of the item to its new group
  // 3. setItem to our NewItems
  const changeCategory = (itemId, group) => {
    const newItems = [...items];
    newItems[itemId - 1].group = group;
    setItems([...newItems]);
  };

  // 1. setNoDrop in case item was dropped in noDrop
  // 2. gets the item id
  // 3. doesn't allow drop in noDrop
  // 4. changeCategory (see above)
  const handleDrop = (e, group) => {
    setNoDrop("");
    const selected = dragData.id;
    if (group === "noDrop") {
      console.log("nuh uh");
    } else {
      changeCategory(selected, group);
    }
  };

  return (
    <>
      <div>
        {/* Add to / Reset state */}
        <button onClick={() => addItem()}>Add Item</button>
        <button onClick={() => reset()}>Reset</button>
      </div>
      <div className="groups">
        {/* iterate over groups */}
        {groups.map((group) => (
          <div
            // change styling if dragging into noDrop zone
            className={`${
              group === "noDrop" && noDrop === "noDrop" ? noDrop : "group"
            }`}
            // event handlers
            onDragEnter={(e) => handleDragEnter(e, group)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, group)}
            key={group}
          >
            <h1 className="title">{group}</h1>
            <div>
              {/* iterate over items */}
              {items
                .filter((item) => item.group === group)
                .map((item) => (
                  <div
                    key={item.id}
                    id={item.id}
                    // change style if dragged over noDrop
                    className={`${
                      group === "noDrop" && noDrop === "noDrop"
                        ? "notAllowed"
                        : "item"
                    }`}
                    // MAKES THE ITEM DRAGGABLE!!!!
                    draggable
                    // event handler
                    onDragStart={(e) => handleDragStart(e, item.id, group)}
                  >
                    {/* The name of each item */}
                    {item.value}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
