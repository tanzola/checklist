import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from './components/Navbar';
import Login from './pages/Login'
import Home from './pages/Home'
import './App.css';
import UserDataService from './services/user-service';
import ChecklistDataService from './services/checklist-service';

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
            .catch((err) => { console.log(err); });
        };
        getLoggedUser();
    }, []);

    const [user, setUser] = useState(null);
    useEffect(() => {
        try {
            if(loggedUser != null) {
                let userPID = loggedUser.provider + loggedUser.id;
                axios.get(`http://localhost:5000/users/pid/${userPID}`, userPID)
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
                                ChecklistDataService.createChecklist({ user_id: resCreateUser.data.id, name: "New Checklist", items:[{/*DELETE KEY FROM CLDAO-ADD*/}] })
                                .then((function(resChecklist) {
                                    let parms = { _id: resCreateUser.data.insertedId, addchecklist: resChecklist.data.insertedId }
                                    try { UserDataService.updateUser(parms); }
                                    catch (e) { console.log(`failed to push first checklist to new user, ${e}`); }
                                })) 
                            } catch (e) { console.log(`failed to create checklist for new user, ${e}`) }
                        }));
                    } catch (e) { console.log(`error creating new user in App, ${e}`) }
                });
            }
        } catch (e) { console.log(`error getting user in App, ${e}`)}
    }, [loggedUser]);

    console.log(user);

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
