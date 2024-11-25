const express = require("express");
const mongoose = require("mongoose");

app = express();
app.use(express.json());

const bookSchema = new mongoose.Schema({
  name: String,
  year: String,
  price: Number,
});

const Book = mongoose.model("books", bookSchema);

app.post("/", async (req, res) => {
  const { name, year, price } = req.body;
  try {
    const newBook = new Book({ name, year, price });
    console.log(newBook);
    await newBook.save();
    res.json({ msg: "Course Added" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

app.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).json({ msg: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);
    if (!updatedBook) {
      res.status(404).json({ msg: "Book not found" });
    }
    res.json({ updatedBook });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).json({ msg: "Book Not Found" });
    }
    res.json({ msg: "Book Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

try {
  mongoose.connect("MONGODB_URI").then(() => {
    console.log("Mongodb Connected");
  });
} catch (err) {
  console.log(err);
}

app.listen(3000, () => {
  console.log("Running on port 3000");
});
