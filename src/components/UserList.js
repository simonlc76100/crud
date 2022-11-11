import { useState, useEffect } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [hasUsers, setHasUsers] = useState(false);

  console.log(users);

  async function getUsers() {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);

    if (data.length > 0) {
      setHasUsers(true);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function deleteUser(id) {
    const res = await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    getUsers();
  }

  return (
    <div className="userlist-container">
      <div className="titles"></div>

      {hasUsers ? (
        <div className="titles">
          <p>Prénom</p>
          <p>Nom</p>
          <p>Email</p>
          <p>mot de passe</p>
        </div>
      ) : (
        <p>Aucun utilisateur</p>
      )}

      {users.map((user) => (
        <div className="user" key={user.id}>
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
          <p>{user.email}</p>
          <p>{user.password}</p>
          <div>
            <button onClick={() => deleteUser(user.id)}>Supprimer</button>
            <button>Éditer</button>
          </div>
        </div>
      ))}
    </div>
  );
}
