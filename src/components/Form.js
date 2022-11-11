import { useState } from "react";

export default function App() {
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
    console.log(firstname, lastname, email, password);
  }

  return (
    <>
      <div className="container">
        <div className="title">Formulaire Utilisateur</div>
        <form className="user-form" onSubmit={handleSubmit}>
          <label>
            Prénom
            <input type="text" name="firstname" value={firstname} onChange={handleChange} />
          </label>
          <label>
            Nom
            <input type="text" name="lastname" value={lastname} onChange={handleChange} />
          </label>
          <label>
            Email
            <input type="email" name="email" value={email} onChange={handleChange} />
          </label>
          <label>
            Mot de passe
            <input type="password" name="password" value={password} onChange={handleChange} />
          </label>

          <button type="submit">envoyer</button>
        </form>
      </div>
    </>
  );
}
