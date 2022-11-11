import { useEffect } from "react";

export default function UserList({ users, getUsers }) {
  useEffect(() => {
    getUsers();
  }, []);

  async function deleteUser(id) {
    await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    });
    getUsers();
  }

  return (
    <div className="userlist-container">
      <div className="titles"></div>

      {users.length > 0 ? (
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
