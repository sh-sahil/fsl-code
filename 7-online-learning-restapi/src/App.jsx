import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "", description: "", price: "" });
  async function getCourses() {
    const res = await fetch("http://localhost:3000/courses");
    const data = await res.json();
    setCourses(data);
  }

  useEffect(() => {
    getCourses();
  }, []);

  function updateCourse(params) {}

  async function deleteCourse(id) {
    const res = await fetch(`http://localhost:3000/courses/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      getCourses();
    }
  }

  async function addCourse() {
    const res = await fetch("http://localhost:3000/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCourse),
    });
    if (res.ok) {
      getCourses();
    }
  }
  return (
    <div>
      <div>
        <input
          type="text"
          val={newCourse.name}
          placeholder="name"
          onChange={e => setNewCourse({ ...newCourse, name: e.target.value })}
        />
        <input
          type="text"
          val={newCourse.description}
          placeholder="description"
          onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
        />
        <input
          type="text"
          val={newCourse.price}
          placeholder="price"
          onChange={e => setNewCourse({ ...newCourse, price: e.target.value })}
        />
        <button onClick={addCourse}>Add Course</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td>{c.price}</td>
              <td>
                <button onClick={() => deleteCourse(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
