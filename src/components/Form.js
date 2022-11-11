export default function Form({ userData, setUserData, id, setId, isEdit, setIsEdit, getUsers }) {
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
      editUser(id);
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

    setId(0);

    setUserData({ firstname: "", lastname: "", email: "", password: "" });
  }

  return (
    <>
      <div className="form-container">
        <div className="title">Formulaire Utilisateur</div>
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="section">
            <div className="input-container">
              <label>
                Prénom
                <input type="text" name="firstname" value={userData.firstname} onChange={handleChange} />
              </label>
            </div>
            <div className="input-container">
              <label>
                Nom
                <input type="text" name="lastname" value={userData.lastname} onChange={handleChange} />
              </label>
            </div>
          </div>
          <div className="section">
            <div className="input-container">
              <label>
                Email
                <input type="email" name="email" value={userData.email} onChange={handleChange} />
              </label>
            </div>
            <div className="input-container">
              <label>
                Mot de passe
                <input type="password" name="password" value={userData.password} onChange={handleChange} />
              </label>
            </div>
          </div>
          <button type="submit">envoyer</button>
        </form>
      </div>
    </>
  );
}
