import "./App.css";
import Form from "./components/Form";
import UserList from "./components/UserList";

import { useState } from "react";

export default function App() {
  //par défaut json server ajoute un champ id à chaque objet créé et
  //incrémente/décrémente automatiquement selon l'ajout ou la suppression d'objets

  const [users, setUsers] = useState([]);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //ajout d'un champ id pour l'édition utilisateur
  const [id, setId] = useState(0);

  const [isEdit, setIsEdit] = useState(false);

  async function getUsers() {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  }

  return (
    <div className="app-container">
      <Form
        firstname={firstname}
        setFirstname={setFirstname}
        lastname={lastname}
        setLastname={setLastname}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        id={id}
        setId={setId}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        getUsers={getUsers}
      />
      <UserList
        users={users}
        getUsers={getUsers}
        setIsEdit={setIsEdit}
        setFirstname={setFirstname}
        setLastname={setLastname}
        setEmail={setEmail}
        setPassword={setPassword}
        setId={setId}
      />
    </div>
  );
}
