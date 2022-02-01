import Google from '../img/google.svg';
import Github from '../img/github.svg';
import './Login.css';

function Login() {

    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };

    const github = () => {
        window.open("http://localhost:5000/auth/github", "_self");
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-button" onClick={google}>
                    <div className="login-button-elem">
                        <img src={Google} alt="" className="icon"></img>
                        <p>Sign in with Google</p>
                    </div>
                </div>
                <div className="login-button" onClick={github}>
                    <div className="login-button-elem">
                        <img src={Github} alt="" className="icon"></img>
                        <p>Sign in with Github</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
