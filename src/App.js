import "./App.css";
import Form from "./components/Form";
import UserList from "./components/UserList";

export default function App() {
  return (
    <div className="app-container">
      <Form />
      <UserList />
    </div>
  );
}
