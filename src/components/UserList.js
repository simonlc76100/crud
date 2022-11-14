import "../assets/styles/UserList.css";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

import { useEffect } from "react";
import userNotFound from "../assets/img/user-not-found.png";
import defaultUserIcon from "../assets/img/default-user-icon.png";

export default function UserList({
  users,
  getUsers,
  isEdit,
  setIsEdit,
  userData,
  setUserData,
}) {
  useEffect(() => {
    getUsers();
  }, []);

  async function deleteUser(id, icon_uuid) {
    const data = await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    });
    const user = await data.json();
    console.log(user);

    if (icon_uuid !== "") {
      const response = await fetch(`https://api.uploadcare.com/files/${icon_uuid}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Uploadcare.Simple c3ed1886422a4f264546:93e28f10a91b4ed75adc",
        },
      });
      const result = await response.json();
      console.log(result);
    }
    getUsers();

    if (isEdit) {
      //si on supprime l'utilisateur en cours d'édition, on supprime
      //l'icone qu'onvient d'upload depuis le formulaire
      const response = await fetch(
        `https://api.uploadcare.com/files/${userData.icon_uuid}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Uploadcare.Simple c3ed1886422a4f264546:93e28f10a91b4ed75adc",
          },
        }
      );
      const result = await response.json();
      console.log(result);

      setIsEdit(false);
      setUserData({
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
      icon: user.icon,
      icon_uuid: user.icon_uuid,
      id: user.id,
      isCustomIcon: user.isCustomIcon,
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
            <div id="blank"></div>
            <p>Pseudo</p>
            <p>E-mail</p>
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
          <img src={user.icon} alt="user-icon" />
          <p>{user.username}</p>
          <p>{user.email}</p>
          <div className="buttons">
            <button id="edit" onClick={() => getUserToEdit(user.id)}>
              <BiEdit />
            </button>
            <button id="delete" onClick={() => deleteUser(user.id, user.icon_uuid)}>
              <RiDeleteBin5Line />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
