import { Link, useLocation} from "react-router-dom";

function Nav() {
 const { pathname } = useLocation();
 return (
   <nav className="nav nav-tabs mt-2">
    <Link className="nav-link" to="/">Home</Link>
     <Link className="nav-link" to="/Search">Search</Link>
     <Link className="nav-link" to="/profile">Profile</Link>
   </nav>
 );
}
export default Nav;