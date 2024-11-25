const express = require("express");
const cors = require("cors");

app = express();
app.use(cors());
app.use(express.json());

let count = 3;

let courses = [
  {
    id: 1,
    name: "JavaScript Basics",
    description: "Learn the basics of JS",
    price: 1299,
  },
  {
    id: 2,
    name: "Python Basics",
    description: "Enter into the Realm of Python",
    price: 599,
  },
];

app.get("/courses", (req, res) => {
  res.json(courses);
});

app.post("/courses", (req, res) => {
  const { name, description, price } = req.body;
  const newCourse = { id: count, name, description, price };
  courses.push(newCourse);
  count = count + 1;
  res.json({ msg: "New Course Added!" });
});

app.put("/courses/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const course = courses.find(c => c.id == id);

  if (course) {
    course.name = name;
    course.description = description;
    course.price = price;
    res.json({ msg: "Course Updated" });
  } else {
    res.status(404).json({ msg: "Course Not Found" });
  }
});

app.delete("/courses/:id", (req, res) => {
  const { id } = req.params;
  courses = courses.filter(c => c.id != id);
  res.json({ msg: "Course Deleted" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
