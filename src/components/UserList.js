import "../assets/styles/UserList.css";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

import { useEffect } from "react";
import userNotFound from "../assets/img/user-not-found.png";

export default function UserList({ users, getUsers, isEdit, setIsEdit, setUserData }) {
  useEffect(() => {
    getUsers();
  }, []);

  async function deleteUser(id) {
    await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    });
    getUsers();
    //si on supprime l'utilisateur en cours d'édition
    //on réinitialise les champs du formulaire
    if (isEdit) {
      setIsEdit(false);
      setUserData({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }

  async function getUserToEdit(id) {
    const data = await fetch(`http://localhost:5000/users/${id}`);
    const user = await data.json();
    //on passe les valeurs de l'utilisateur à éditer dans les champs du formulaire
    console.log(user);
    setIsEdit(true);

    setUserData({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      password: user.password,
      confirmPassword: user.password,
      passwordMatch: true,
      id: user.id,
    });
  }

  return (
    <div className="userlist-container">
      {users.length > 0 ? (
        <div>
          <div className="title-container">
            <p className="list">Liste des utilisateurs</p>
            <div className="separator"></div>
          </div>
          <div className="titles">
            <p>Prénom</p>
            <p>Nom</p>
            <p>Email</p>
          </div>
        </div>
      ) : (
        <div className="no-user">
          <p className="list">Aucun utilisateur</p>
          <div className="separator"></div>
          <img src={userNotFound} alt="user not found" />
        </div>
      )}

      {users.map((user) => (
        <div className="user" key={user.id}>
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
          <p>{user.email}</p>
          <div className="buttons">
            <button id="edit" onClick={() => getUserToEdit(user.id)}>
              <BiEdit />
            </button>
            <button id="delete" onClick={() => deleteUser(user.id)}>
              <RiDeleteBin5Line />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
