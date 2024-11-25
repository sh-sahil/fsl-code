import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [books, setBooks] = useState(null);

  async function getBooks() {
    const res = await fetch("http://localhost:3000/");
    const data = await res.json();
    setBooks(data);
    console.log(data);
  }

  return (
    <div>
      {!books ? (
        <button onClick={getBooks}>Get Books</button>
      ) : (
        <button onClick={() => setBooks(null)}>Clear Books </button>
      )}

      {books &&
        books.map((book, i) => (
          <div key={i}>
            <li>{book.name}</li>
            <li>{book.year}</li>
            <li>{book.price}</li>
          </div>
        ))}
    </div>
  );
}

export default App;
