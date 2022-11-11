export default function Form({ firstname, setFirstname, lastname, setLastname, email, setEmail, password, setPassword, id, setId, isEdit, setIsEdit, getUsers }) {
  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case "firstname":
        setFirstname(value);
        break;
      case "lastname":
        setLastname(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
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
      body: JSON.stringify({ firstname, lastname, email, password }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    getUsers();
  }

  async function editUser(id) {
    console.log(id);
    await fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, email, password }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    getUsers();

    setIsEdit(false);

    setId(0);

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
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
                <input type="text" name="firstname" value={firstname} onChange={handleChange} />
              </label>
            </div>
            <div className="input-container">
              <label>
                Nom
                <input type="text" name="lastname" value={lastname} onChange={handleChange} />
              </label>
            </div>
          </div>
          <div className="section">
            <div className="input-container">
              <label>
                Email
                <input type="email" name="email" value={email} onChange={handleChange} />
              </label>
            </div>
            <div className="input-container">
              <label>
                Mot de passe
                <input type="password" name="password" value={password} onChange={handleChange} />
              </label>
            </div>
          </div>
          <button type="submit">envoyer</button>
        </form>
      </div>
    </>
  );
}
