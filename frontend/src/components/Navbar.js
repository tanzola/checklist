import { NavLink } from "react-router-dom";
import './Navbar.css';

const links = [
    { name: "Home", path: "/" },
    { name: "Login", path: "/login" }
];

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
        props.user ? (
            <>
                <li className="nav-list-item">
                    <img
                        src={props.user.photos[0].value}
                        alt=""
                        className="avatar">
                    </img>
                </li>
                {/* <li className="nav-list-item">{displayName()}</li> */}
                <li className="nav-list-item nav-text" onClick={logout}>Logout</li>
            </>
        ) : (
            <NavLink to="/login" className="nav-list-item nav-text">Login</NavLink>
        )
    );

    return (
        <div className="navbar">
            <span className="logo" style={{marginBottom: "3px"}}><NavLink to="/" className="nav-list-item">Checklists</NavLink></span>
            <ul className="nav-list">
                {userinfo}
            </ul>
        </div>
    )
}

export default Navbar;
