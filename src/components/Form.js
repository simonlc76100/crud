import "../assets/styles/Form.css";

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
      case "email":
        setUserData({ ...userData, email: value });
        break;
      case "password":
        setUserData({ ...userData, password: value });
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
    setUserData({ firstname: "", lastname: "", email: "", password: "" });
  }

  async function editUser(id) {
    console.log(id);
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

    setUserData({ firstname: "", lastname: "", email: "", password: "", id: 0 });
  }

  return (
    <>
      <div className="form-container">
        <div className="title">Formulaire Utilisateur</div>
        <div className="separator"></div>
        <form className="user-form" onSubmit={handleSubmit}>
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
                Email
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
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
