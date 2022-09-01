import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password === user.cpassword) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/create-user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name: user.name, email: user.email, password: user.password})
          }
        );
        if (response.ok) {
          const json = await response.json();
          localStorage.setItem("auth-token", json.authtoken);
          navigate("/");
        } else {
          alert("Invalid User Information");
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      alert("Your password and confirmation password do not match");
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="text" className="form-label">Email address</label>
          <input type="name" className="form-control" id="name" name="name" value={user.name} onChange={onChange} minLength={3} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" value={user.cpassword} onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
