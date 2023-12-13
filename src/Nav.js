import { Link, useLocation } from "react-router-dom";

function Nav() {
  const { pathname } = useLocation();
  return (
    <nav className="nav nav-tabs mt-2">
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/Play">
        Play
      </Link>
      <Link className="nav-link" to="/Search/">
        Search
      </Link>
      <Link className="nav-link" to="/profile">
        Profile
      </Link>
      <Link className="nav-link" to="/usersearch">
        Users
      </Link>
    </nav>
  );
}
export default Nav;
