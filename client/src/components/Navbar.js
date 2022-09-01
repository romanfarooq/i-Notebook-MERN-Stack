import { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import NoteContext from "../context/NoteContext";
import Alert from "./Alert";

function Navbar() {

  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(NoteContext)
  const { alert, showAlert } = context;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    showAlert("Logged out Succesfully", "success");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            {localStorage.getItem("token") ? (
              <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            ) : (
              <form className="d-flex" role="search">
                <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-2" to="/sign-up" role="button" >SignUp</Link>
              </form>
            )}
          </div>
        </div>
      </nav>
      <Alert alert={alert} />
      <Outlet />
    </>
  );
}

export default Navbar;
