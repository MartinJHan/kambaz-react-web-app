import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h1>Sign up</h1>
      <input
        id="wd-username"
        placeholder="username"
        className="mb-2 form-control"
      />
      <input
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2 form-control"
      />
      
      <Link
        id="wd-signup-btn"
        to="/Kambaz/Account/Profile"
        className="btn btn-primary w-100 mb-2"
      >
        Sign up
      </Link>
      <Link id="wd-signin-link" to="/Kambaz/Account/Signin">
        Sign in
      </Link>
    </div>
  );
}
