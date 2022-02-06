import { NavLink } from "react-router-dom";
import './Navbar.css';

function Navbar(props) {

    function displayName() {
        switch(props.user.provider) {
            case "google": return props.user.given_name;
            case "github":
                if (props.user.displayName) { return props.user.displayName.split(' ')[0]; }
                else { return props.user.username; }
        }
    }

    function logout(){
        window.open("http://localhost:5000/auth/logout", "_self");
    };

    const userinfo = (
        props.user ?
            <ul className="nav-list">
                <li><img src={props.user.photos[0].value} alt="" className="avatar" /></li>
                <li className="nav-text" onClick={logout}>Logout</li>
            </ul>
        : <NavLink to="/login" className="nav-text">Sign in</NavLink>
        
    );

    return (
        <header className="navbar">
            <nav className="nav-elem">
                <NavLink to="/" className="logo nav-text">xTask</NavLink>
            </nav>
            <div className="nav-elem">
                {userinfo}
            </div>
        </header>
    )
}

export default Navbar;
