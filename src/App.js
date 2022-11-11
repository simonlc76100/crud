import "./App.css";
import Form from "./components/Form";
import UserList from "./components/UserList";

import { useState } from "react";

export default function App() {
  //par défaut json server ajoute un champ id à chaque objet créé et
  //incrémente/décrémente automatiquement selon l'ajout ou la suppression d'objets

  const [users, setUsers] = useState([]);

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

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
        userData={userData}
        setUserData={setUserData}
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
        setUserData={setUserData}
        setId={setId}
      />
    </div>
  );
}
