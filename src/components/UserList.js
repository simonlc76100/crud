import { useState, useEffect } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container-UserList">
      <div className="titles">
        <p>Prénom</p>
        <p>Nom</p>
        <p>Email</p>
        <p>mot de passe</p>
      </div>

      {users.map((user) => (
        <div className="user" key={user.id}>
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
          <p>{user.email}</p>
          <p>{user.password}</p>
          <div>
            <button>Supprimer</button>
            <button>Éditer</button>
          </div>
        </div>
      ))}
    </div>
  );
}
