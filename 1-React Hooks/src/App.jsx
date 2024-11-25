import { useState, useEffect, useRef } from "react";
export default function App(params) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    const initialTodo = [
      {
        text: "Drink Coffee",
        completed: false,
      },
      {
        text: "Go to Gym",
        completed: false,
      },
    ];

    if (inputRef.current) {
      inputRef.current.focus();
    }

    setTodos(initialTodo);
  }, []);

  function handleClick(index) {
    const updatesTodo = todos.filter((todo, id) => id != index);
    setTodos(updatesTodo);
    inputRef.current.focus();
  }

  function handleAddButton() {
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo("");
    inputRef.current.focus();
  }

  function handleKeyDown(e) {
    if (e.key == "Enter") {
      handleAddButton();
      inputRef.current.focus();
    }
  }

  function handleToggleComplete(index) {
    const updatedTodos = todos.map((todo, id) => {
      if (id === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
    inputRef.current.focus();
  }

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <button onClick={handleAddButton}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            <span onClick={() => handleToggleComplete(index)}>{todo.text}</span>
            <button onClick={() => handleClick(index)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
