const express = require("express");
const cors = require("cors");
app = express();
app.use(cors());

const bookSchema = [
  {
    name: "JS Course",
    year: 2019,
    price: 4500,
  },
  {
    name: "Python Course",
    year: 2009,
    price: 2999,
  },
];

app.get("/", (req, res) => {
  res.json(bookSchema);
});

app.listen(3000, () => {
  console.log("server in running on port 3000");
});
