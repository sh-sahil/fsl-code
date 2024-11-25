const express = require("express");

app = express();
app.use(express.json());

let count = 4;

let items = [
  {
    id: 1,
    product: "Mobile",
    price: 8999,
    category: "Electronics",
  },
  {
    id: 2,
    product: "Earphones",
    price: 899,
    category: "Electronics",
  },
  {
    id: 3,
    product: "Tablet",
    price: 19999,
    category: "Electronics",
  },
];

app.get("/", (req, res) => {
  res.json(items);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  const item = items.find(i => i.id == id);
  if (item) {
    res.json({ item });
  } else {
    res.status(404).json({ msg: "item not found" });
  }
});

app.post("/", (req, res) => {
  const { product, price, category } = req.body;
  const newItem = { id: count, product, price, category };
  console.log(newItem);
  items.push(newItem);
  count += 1;
  res.json({ msg: "Item added" });
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { product, price, category } = req.body;
  let itemFound = false;
  items = items.map(item => {
    if (item.id == id) {
      itemFound = true;
      return {
        ...item,
        product,
        price,
        category,
      };
    }
    return item;
  });

  if (itemFound) {
    res.json({ msg: "Item Updated" });
  } else {
    res.status(404).json({ msg: "item not found" });
  }
});

app.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { product, price, category } = req.body;
  let itemFound = false;
  items = items.map(item => {
    if (item.id == id) {
      itemFound = true;
      return {
        ...item,
        product: product ?? item.product,
        price: price ?? item.price,
        category: category ?? item.category,
      };
    }
    return item;
  });

  if (itemFound) {
    res.json({ msg: "Item Updated" });
  } else {
    res.status(404).json({ msg: "item not found" });
  }
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;

  let itemFound = false;
  items = items.filter(item => {
    if (item.id == id) {
      itemFound = true;
    } else {
      return itemFound;
    }
  });

  if (itemFound) {
    res.json({ msg: "Item deleted" });
  } else {
    res.status(404).json({ msg: "item not found" });
  }
});

app.listen(3000, () => {
  console.log("Server in running on port 3000");
});
