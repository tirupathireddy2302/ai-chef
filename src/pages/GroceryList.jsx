import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

import BackButton from "../components/BackButton";
import "../styles/GroceryList.css";
import {saveGroceryItem,getGroceryItems,deleteGroceryItem} from "../services/groceryService";

import { useAuth }from "../context/AuthContext";

function GroceryList() {
const [itemName, setItemName] = useState("");
const [quantity, setQuantity] = useState(1);
const [category, setCategory] = useState("Vegetables");
const [price, setPrice] = useState("");
const { user } =useAuth();
const [groceryItems, setGroceryItems] = useState([]);    
const [filter,setFilter] =useState("All");   
const [search, setSearch] =useState("");  
const [editingId,setEditingId] =useState(null);

 useEffect(() => {

  if (!user) return;

  const loadItems = async () => {

    try {

      const data =
        await getGroceryItems(
          user.uid
        );

      setGroceryItems(
        data
      );

    } catch (error) {

      console.error(error);

    }

  };

  loadItems();

}, [user]);
useEffect(() => {

  const customItems =
    groceryItems.filter(
      item =>
        item.category !==
        "Imported"
    );

  localStorage.setItem(
    "smartGroceryList",
    JSON.stringify(
      customItems
    )
  );

}, [groceryItems]);

  const toggleItem =
    (index) => {

      const updatedItems =
        [...groceryItems];

      updatedItems[index].checked =
        !updatedItems[index]
          .checked;

      setGroceryItems(
        updatedItems
      );

    };

 const deleteItem =
  async (id) => {

    try {

      await deleteGroceryItem(
        user.uid,
        id
      );

      setGroceryItems(
        prev =>
          prev.filter(
            item =>
              item.id !== id
          )
      );

    } catch (error) {

      console.error(error);

    }

  };
 const clearAll = async () => {

  if (
    !window.confirm(
      "Clear grocery list?"
    )
  ) return;

  try {

    await Promise.all(

      groceryItems.map(
        item =>
          deleteGroceryItem(
            user.uid,
            item.id
          )
      )

    );

    setGroceryItems([]);

  } catch (error) {

    console.error(error);

  }

};
  const copyList =
    () => {

      const text =
  groceryItems
    .filter(item =>
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )
    .map(
      item =>
        `${item.checked ? "✅" : "⬜"} ${item.name}`
    )
    .join("\n");
      navigator.clipboard.writeText(
        text
      );

      alert(
        "🛒 Grocery List Copied!"
      );

    };

  const downloadPDF =
    () => {

      const doc =
        new jsPDF();

      doc.setFontSize(20);

      doc.text(
        "Smart Grocery List",
        20,
        20
      );

      groceryItems.forEach(
        (
          item,
          index
        ) => {

          doc.text(
            `${item.checked
              ? "✓"
              : "□"} ${
              item.name
            }`,
            20,
            40 +
              index * 10
          );

        }
      );

      doc.save(
        "grocery-list.pdf"
      );

    };
    const editItem = (id) => {

  const item =
    groceryItems.find(
      item =>
        item.id === id
    );

  setItemName(
    item.name
  );

  setQuantity(
    item.quantity
  );

  setPrice(
    item.price
  );

  setCategory(
    item.category
  );

  setEditingId(id);

};
  const addItem = async () => {

  if (!itemName.trim())
    return;

  try {

    if (editingId) {

      const updated =
        groceryItems.map(
          item =>

            item.id === editingId

              ? {
                  ...item,
                  name: itemName,
                  quantity:
                    Number(quantity),
                  category,
                  price:
                    Number(price)
                }

              : item
        );

      setGroceryItems(
        updated
      );

      setEditingId(
        null
      );

    } else {

      const newItem = {

        name: itemName,

        quantity:
          Number(quantity),

        category,

        price:
          Number(price) || 0,

        checked: false

      };

      await saveGroceryItem(
        user.uid,
        newItem
      );

      const data =
        await getGroceryItems(
          user.uid
        );

      setGroceryItems(
        data
      );

    }

    setItemName("");
    setQuantity(1);
    setPrice("");
    setCategory(
      "Vegetables"
    );

  } catch (error) {

    console.error(error);

  }

};
const filteredItems = groceryItems.filter(
  item => {

    const matchesSearch =
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesCategory =
      filter === "All"
        ? true
        : item.category === filter;

    return (
      matchesSearch &&
      matchesCategory
    );

  }
);
  return (

    <div className="grocery-page">

      <BackButton />

      <h1>
        🛒 Smart Grocery List
      </h1>
      <input
  type="text"
  className="search-grocery"
  placeholder="🔍 Search Grocery Item..."
  value={search}
  onChange={(e) =>
    setSearch(
      e.target.value
    )
  }
/>
{/* <select
  className="category-filter"
  value={filter}
  onChange={(e) =>
    setFilter(
      e.target.value
    )
  }
>

  <option value="All">
    All Categories
  </option>

  <option value="Vegetables">
    Vegetables
  </option>

  <option value="Fruits">
    Fruits
  </option>

  <option value="Dairy">
    Dairy
  </option>

  <option value="Meat">
    Meat
  </option>

  <option value="Spices">
    Spices
  </option>

  <option value="Others">
    Others
  </option>

</select> */}

      <div className="add-grocery">

  <input
    type="text"
    placeholder="Item Name"
    value={itemName}
    onChange={(e)=>
      setItemName(
        e.target.value
      )
    }
  />

  <input
    type="number"
    min="1"
    value={quantity}
    onChange={(e)=>
      setQuantity(
        e.target.value
      )
    }
  />

 <select
  value={category}
  onChange={(e)=>
    setCategory(
      e.target.value
    )
  }
>
    <option>
      Vegetables
    </option>
    <option>
      Fruits
    </option>
    <option>
      Dairy
    </option>
    <option>
      Meat
    </option>
    <option>
      Spices
    </option>
    <option>
      Others
    </option>
  </select>

  <input
    type="number"
    placeholder="Price ₹"
    value={price}
    onChange={(e)=>
      setPrice(
        e.target.value
      )
    }
  />

  <button
  onClick={addItem}
  disabled={!user}
>
  {editingId
    ? "💾 Save"
    : "➕ Add Item"}
</button>
</div>

<h3 className="purchase-count">
  Purchased:
  {
  filteredItems.filter(
    item => item.checked
  ).length
}
  
</h3>
<div className="progress-bar">

  <div
    className="progress-fill"
    style={{
     width: `${
  filteredItems.length
    ? (
        filteredItems.filter(
          item =>
            item.checked
        ).length
        /
        filteredItems.length
      ) * 100
    : 0
}%`
    }}
  />

</div>

      {groceryItems.length > 0 && (

        <div className="grocery-actions">

          <button
            className="copy-btn"
            onClick={copyList}
          >
            📋 Copy List
          </button>

          <button
            className="pdf-btn"
            onClick={
              downloadPDF
            }
          >
            📄 Download PDF
          </button>

          <button
            className="clear-btn"
            onClick={
              clearAll
            }
          >
            🗑 Clear All
          </button>

        </div>

      )}

      {groceryItems.length === 0 ? (

        <div className="empty-grocery">

          <h3>
            No Grocery Items Found
          </h3>

          <p>
            Add recipes to
            favorites first.
          </p>

        </div>

      ) : (

        <div className="grocery-container">

          {filteredItems.map(
            (
              item,
              index
            ) => (

              <div
  key={item.id}
  className={`grocery-item ${
    item.checked
      ? "checked"
      : ""
  }`}
>

                <div
  className="grocery-content"
  onClick={() =>
    toggleItem(index)
  }
>

  <span>
    {item.checked
      ? "✅"
      : "⬜"}
  </span>

  <div className="grocery-details">

    <h4>
      {item.name}
    </h4>

    <p>
      🔢 Qty:
      {item.quantity || 1}
    </p>

    <p>
      💰 ₹
      {item.price || 0}
    </p>

    <small>
      🏷️ {
        item.category ||
        "Imported"
      }
    </small>

  </div>

</div>

                <div
  className="grocery-btns"
>

  <button
    className="edit-btn"
    onClick={() =>
      editItem(
        item.id
      )
    }
  >
    ✏️
  </button>

  <button
    className="delete-grocery-btn"
   onClick={() =>
  deleteItem(
    item.id
  )
}
  >
    🗑
  </button>

</div>

              </div>

            )
          )}

        </div>
        

      )}
      <h3>


</h3>
      {groceryItems.reduce(
  (sum, item) =>
    sum +
    (item.price || 0) *
    (item.quantity || 1),
  0
) > 0 ? (

  <h3 className="total-cost">
    💰 Estimated Cost:
    ₹{
      groceryItems.reduce(
        (sum, item) =>
          sum +
          (item.price || 0) *
          (item.quantity || 1),
        0
      )
    }
  </h3>

) : (

  <h3 className="total-cost">
    💰 Add prices to calculate cost
  </h3>

)}

    </div>

  );
}

export default GroceryList;