import Google from '../img/google.png';
import Github from '../img/github.png';
import './Login.css';

function Login() {

    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };

    const github = () => {
        window.open("http://localhost:5000/auth/github", "_self");
    };

    return (
        <div className="login">
            <h1 className="login-title">Choose a Login Method</h1>
            <div className="wrapper shadow">
                <div className="login-button google" onClick={google}>
                    <img src={Google} alt="" className="icon"></img>
                    Google
                </div>
                <div className="login-button github" onClick={github}>
                    <img src={Github} alt="" className="icon"></img>
                    Github
                </div>
            </div>
        </div>
    )
}

export default Login
