import "../assets/styles/Form.css";
import defaultUserIcon from "../assets/img/default-user-icon.png";
import { AiOutlineUpload } from "react-icons/ai";
import { useEffect } from "react";

export default function Form({ userData, setUserData, isEdit, setIsEdit, getUsers }) {
  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "firstname":
        setUserData({ ...userData, firstname: value });
        break;
      case "lastname":
        setUserData({ ...userData, lastname: value });
        break;
      case "username":
        setUserData({ ...userData, username: value });
        break;
      case "email":
        setUserData({ ...userData, email: value });
        break;
      case "password":
        setUserData({ ...userData, password: value });
        break;
      case "confirmPassword":
        setUserData({ ...userData, confirmPassword: value });
        break;

      case "icon":
        setUserData({ ...userData, icon: URL.createObjectURL(e.target.files[0]) });
        break;
      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isEdit) {
      //edit user
      editUser(userData.id);
    } else {
      //add user
      addUser();
    }
  }

  async function addUser() {
    if (userData.password !== userData.confirmPassword) {
      setUserData({ ...userData, passwordMatch: false });
      console.log("account not created");
      return;
    }

    const data = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });
    const user = await data.json();
    console.log(user);
    getUsers();
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

  async function editUser(id) {
    console.log(id);

    if (userData.password !== userData.confirmPassword) {
      setUserData({ ...userData, passwordMatch: false });
      console.log("account not edited");
      return;
    }

    const data = await fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });
    const user = await data.json();
    console.log(user);
    getUsers();
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

  async function uploadFile(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("UPLOADCARE_PUB_KEY", "c3ed1886422a4f264546");
    const response = await fetch("https://upload.uploadcare.com/base/", {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    setUserData({ ...userData, icon_uuid: result.file });
  }

  async function getFile() {
    const response = await fetch(
      `https://api.uploadcare.com/files/${userData.icon_uuid}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Uploadcare.Simple c3ed1886422a4f264546:93e28f10a91b4ed75adc",
        },
      }
    );
    const result = await response.json();
    setUserData({ ...userData, icon: result.original_file_url, isCustomIcon: true });
  }

  async function deleteFile() {
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
  }

  async function changeIcon(e) {
    if (userData.isCustomIcon) {
      await deleteFile();
    }
    await uploadFile(e);
  }

  useEffect(() => {
    if (userData.icon_uuid !== "") {
      getFile();
    }
  }, [userData.icon_uuid]);

  return (
    <>
      <div className="form-container">
        <div className="title">Formulaire Utilisateur</div>
        <div className="separator"></div>
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="icon-section">
            <div className="title-icon-container">
              <p>Photo de profil</p>
              <div className="icon-container">
                <img src={userData.icon} alt="user icon" />
                <div className="edit-icon">
                  <AiOutlineUpload />
                  <input
                    type="file"
                    name="icon"
                    id="icon"
                    accept="image/*"
                    onChange={(e) => {
                      userData.isCustomIcon ? changeIcon(e) : uploadFile(e);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="input-container">
              <label>
                Prénom
                <input
                  type="text"
                  name="firstname"
                  value={userData.firstname}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                Nom
                <input
                  type="text"
                  name="lastname"
                  value={userData.lastname}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>
          <div className="section">
            <div className="input-container">
              <label>
                Nom d'utilisateur
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                E-mail
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </div>
          <div className="section">
            <div className="input-container">
              <label>
                Mot de passe
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="input-container">
              {userData.passwordMatch ? (
                <label>
                  Confirmer le mot de passe
                  <input
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </label>
              ) : (
                <label>
                  Confirmer le mot de passe
                  <input
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    required
                    style={{ border: "1px solid red" }}
                  />
                </label>
              )}
            </div>
          </div>
          <div className="submit-container">
            <button type="submit">
              {isEdit ? "Éditer utilisateur" : "Ajouter utilisateur"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
