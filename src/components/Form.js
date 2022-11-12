import "../assets/styles/Form.css";
import defaultUserIcon from "../assets/img/default-user-icon.png";
import { AiOutlineUpload } from "react-icons/ai";

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

    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
    });
  }

  async function editUser(id) {
    console.log(id);

    if (userData.password !== userData.confirmPassword) {
      setUserData({ ...userData, passwordMatch: false });
      console.log("account not edited");
      return;
    }

    await fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
    });
  }

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
                    onChange={handleChange}
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
