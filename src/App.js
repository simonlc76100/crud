import "./App.css";
import Form from "./components/Form";
import UserList from "./components/UserList";
import defaultUserIcon from "./assets/img/default-user-icon.png";

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
    icon: defaultUserIcon,
    icon_uuid: "",
    isCustomIcon: false,
    id: 0,
  });

  const [isEdit, setIsEdit] = useState(false);

  async function getUsers() {
    const data = await fetch("http://localhost:5000/users");
    const users = await data.json();
    setUsers(users);
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
