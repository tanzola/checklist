import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Checklists.css';
import Checklist from './Checklist';
import UserDataService from '../services/user-service';

function Checklists(props) {

    
    const [user, setUser] = useState({});
    useEffect(() => {
        UserDataService.getById(props.user._id)
        .then(function(res) { setUser(res.data); })
    }, []);

    let checklists = null;
    if (user.checklists) {        
        checklists = (
            <div>
                {user.checklists.map(checklist => (
                    <Checklist user={user} checklist={checklist} key={checklist._id} />
                ))}
            </div>
        )
    }

    return(
        <div>{checklists}</div>
    )
}

export default Checklists;