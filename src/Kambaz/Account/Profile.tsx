import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <input
        defaultValue="alice"
        placeholder="username"
        className="mb-2 form-control"
      />
      <input
        defaultValue="123"
        placeholder="password"
        type="password"
        className="mb-2 form-control"
      />
      <input
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
        className="mb-2 form-control"
      />
      <input
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
        className="mb-2 form-control"
      />
      <input
        defaultValue="2000-01-01"
        type="date"
        id="wd-dob"
        className="mb-2 form-control"
      />
      <input
        defaultValue="alice@wonderland"
        type="email"
        id="wd-email"
        className="mb-2 form-control"
      />
      <select
        defaultValue="FACULTY"
        id="wd-role"
        className="mb-2 form-select"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <Link
        to="/Kambaz/Account/Signin"
        className="btn btn-danger w-100 mt-2"
      >
        Sign out
      </Link>
    </div>
  );
}
