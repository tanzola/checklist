import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Checklist.css';

function Checklist(props) {


    var [user, setUser] = useState({});
    useEffect(() => {
        axios.get("http://localhost:5000/users/id/61e3be6042bb223a2f20a325")
        .then(
            function(res) {
                setUser(res.data);
            }
        )
    }, []);

    let checklists;
    if (user.checklists) {
        checklists = (
            <div>
                {user.checklists.map(checklist => (
                    <div className="checklist shadow">
                        <div>{checklist.name}</div>
                    </div>
                ))}
            </div>
        )
    }
    else {
        checklists = null;
    }

    return(
        <div>{checklists}</div>
    )
}

export default Checklist;