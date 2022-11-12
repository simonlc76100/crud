import "./App.css";
import Form from "./components/Form";
import UserList from "./components/UserList";

import { useState } from "react";

export default function App() {
  //par défaut json server ajoute un champ id à chaque objet créé et
  //incrémente/décrémente automatiquement selon l'ajout ou la suppression d'objets
  //on ajoute quand même un champ id pour récupérer l'id de l'utilisateur à éditer
  const [users, setUsers] = useState([]);

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    passwordMatch: true,
    id: 0,
  });

  const [isEdit, setIsEdit] = useState(false);

  async function getUsers() {
    await fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }

  return (
    <div className="app-container">
      <Form
        userData={userData}
        setUserData={setUserData}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        getUsers={getUsers}
      />
      <UserList
        users={users}
        getUsers={getUsers}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        setUserData={setUserData}
      />
    </div>
  );
}
