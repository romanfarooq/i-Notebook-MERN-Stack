import { Link } from "react-router-dom";

export default function About() {
  return (
    <main role="main">
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">About</h1>
          <p>
            This is a Full Stack Web Application to store personal notes with user authentication.
            <br />
            <br />
            Made By Roman Farooq
            <br />
            Student at University of Centeral Punjab
          </p>
          <p>
            <Link className="btn btn-primary btn-lg" to="/" role="button">
              Learn more &raquo;
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}