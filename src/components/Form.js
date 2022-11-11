import { useState } from "react";

export default function Form({ getUsers }) {
  //par défaut json server ajoute un champ id à chaque objet créé et
  //incrémente/décrémente automatiquement selon l'ajout ou la suppression d'objets

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    addUser();
  }

  async function addUser() {
    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });
    const data = await res.json();
    console.log(data);
    getUsers();
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
