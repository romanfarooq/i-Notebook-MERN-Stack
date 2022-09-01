import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/NoteContext";

function Login() {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const context = useContext(NoteContext)
  const { showAlert } = context;

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
      });
      if (response.ok) {
        const json = await response.json();
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        showAlert("Logged In Successfully", "success");
      } else {
        showAlert("Invalid Credentials", "danger");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Login to Continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} autoComplete="off" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Login;
