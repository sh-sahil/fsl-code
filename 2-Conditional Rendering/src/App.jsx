import React, { useState } from "react";

export default function App() {
  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("login") === "true";
  });
  const [current, setCurrent] = useState("");
  const [users, setUsers] = useState([
    { name: "User1", age: 23, gender: "Male" },
    { name: "User2", age: 32, gender: "Female" },
    { name: "User3", age: 43, gender: "Male" },
  ]);

  const [originalUsers] = useState([...users]);
  const handleLogin = () => {
    const newLoginState = !isLogin;
    setIsLogin(!isLogin);
    localStorage.setItem("login", newLoginState);
  };

  const filterUser = curr => {
    if (current === curr) {
      setUsers(originalUsers);
      setCurrent("");
    } else {
      const updatedUsers = users.filter(user => user.gender === curr);
      setUsers(updatedUsers);
      setCurrent(curr);
    }
  };

  return (
    <div>
      {isLogin ? (
        <div>
          You're Logged in
          <button onClick={handleLogin}>Logout</button>
          <table style={{ padding: "30px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr style={{ padding: "30px" }} key={index}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={() => filterUser("Male")}>
              {current === "Male" ? "Clear Filter" : "Male"}
            </button>
            <button onClick={() => filterUser("Female")}>
              {current === "Female" ? "Clear Filter" : "Female"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          Login to enter
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}
