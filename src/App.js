import "./App.css";
import Form from "./components/Form";
import UserList from "./components/UserList";

import { useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  }

  return (
    <div className="app-container">
      <Form getUsers={getUsers} />
      <UserList users={users} getUsers={getUsers} />
    </div>
  );
}
