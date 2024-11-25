const mongoose = require("mongoose");

try {
  mongoose.connect("MONGODB_URI").then(() => {
    console.log("MongoDB Connected");
  });
} catch (err) {
  console.log(err);
}

const itemSchema = new mongoose.Schema({
  name: String,
  price: String,
  product: String,
});

const Item = mongoose.model("item", itemSchema);

//Create
const newItem = new Item({
  name: "Itme1",
  price: 4599,
  product: "Mobile",
});

newItem.save();

//Read
Item.find().then(items => console.log(items));

//Update
Item.updateOne({ name: "Item1" }, { price: 5000 })
  .then(() => console.log("Item Updated"))
  .catch(() => console.log("Error in updating the value"));

//Delete
Item.deleteOne({ name: "Item1" })
  .then(() => console.log("Item Deleted"))
  .catch(() => console.log("Error in deleting"));
