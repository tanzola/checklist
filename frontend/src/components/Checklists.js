import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Checklists.css';
import Checklist from './Checklist';
import Listitem from './Listitem';
import UserDataService from '../services/checklist-service';
import ChecklistDataService from '../services/checklist-service';
import TaskDataService from '../services/task-service';

function Checklists(props) {

    
    const [user, setUser] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:5000/users/id/${props.user._id}`)
        .then(function(res) { setUser(res.data); })
    }, []);
    
    let checklists;
    if (user.checklists) {        
        checklists = (
            <div>
                {user.checklists.map(checklist => (
                    <Checklist user={user} checklist={checklist} key={checklist._id} />
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

export default Checklists;