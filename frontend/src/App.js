import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserDataService from './services/user-service';
import ChecklistDataService from './services/checklist-service';
import Navbar from './components/Navbar';
import Login from './pages/Login'
import Home from './pages/Home'
import './App.css';

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
            .then((resObject) => { setLoggedUser(resObject.user); })
            .catch((e) => { console.log(e); });
        };
        getLoggedUser();
    }, []);

    const [user, setUser] = useState(null);
    useEffect(() => {
        try {
            if(loggedUser != null) {
                let userPID = loggedUser.provider + loggedUser.id;
                UserDataService.getByPID(userPID)
                .then(function(resUser) { setUser(resUser.data); })
                .catch( (e) => {
                    try {
                        let name;
                        switch(loggedUser.provider) {
                            case "google": name = loggedUser.name.givenName; break;
                            case "github":
                                if (loggedUser.displayName) { name = loggedUser.name.displayName.split(' ')[0]; }
                                else { name = loggedUser.username; }
                                break;
                            default: name = null;
                        }
                        UserDataService.createUser({ name: name, pid: userPID })
                        .then((function(resCreateUser) {
                            try {
                                ChecklistDataService.createChecklist({ userId: resCreateUser.data.insertedId, name: "New Checklist" })
                            } catch (e) { console.log(`failed to create checklist for new user, ${e}`) }
                        }));
                    } catch (e) { console.log(`error creating new user in App, ${e}`) }
                });
            }
        } catch (e) { console.log(`error getting user in App, ${e}`)}
    }, [loggedUser]);

    return (
        <div>
            <Router>
                <Navbar user={loggedUser} />
                <Routes>
                    <Route path="/login" element={loggedUser ? <Navigate to="/" /> : <Login />} />
                    <Route path="/" element={<Home user={user} />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
