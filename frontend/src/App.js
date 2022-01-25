import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from './components/Navbar';
import Login from './pages/Login'
import Home from './pages/Home'
import './App.css';
import UserDataService from './services/user-service';

function App() {

    const [loggedUser, setLoggedUser] = useState(null);
    useEffect(() => {
        const getLoggedUser = () => {
            fetch("http://localhost:5000/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
                .then((response) => {
                    if (response.status === 200) return response.json();
                    throw new Error("authentication has failed!");
                })
                .then((resObject) => {
                    setLoggedUser(resObject.user);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getLoggedUser();
    }, []);

    const [user, setUser] = useState(null);
    useEffect(() => {
        try {
            if(loggedUser != null) {
                let userPID = loggedUser.provider + loggedUser.id;
                axios.get("http://localhost:5000/users/pid/google104768674646137928797", userPID)//
                .then(function(res) { setUser(res.data); })
                .catch( (e) => {
                    try {
                        let name;
                        switch(loggedUser.provider) {
                            case "google": name = loggedUser.name.givenName;
                            case "github":
                                if (loggedUser.displayName) { name = loggedUser.name.displayName.split(' ')[0]; }
                                else { name = loggedUser.name.username; }
                        }
                        UserDataService.createUser(
                            {
                                name: name,
                                pid: userPID
                            }
                        );
                    }
                    catch (e) {
                        console.log(`error creating new user in app, ${e}`)
                    }
                });
            }
        }
        catch (e) {
            console.log(`error getting user in app, ${e}`)
        }
    }, [loggedUser]);

    return (
        <div>
            <Router>
                <Navbar user={loggedUser} />
                <Routes>
                    <Route path="/login" element={loggedUser ? <Navigate to="/" /> : <Login />} />
                    <Route path="/" element={<Home logged_user={loggedUser} />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
