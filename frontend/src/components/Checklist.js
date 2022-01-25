import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Checklist.css';
import Listitem from './Listitem';
import ChecklistDataService from '../services/checklist-service';
import TaskDataService from '../services/task-service';

function Checklist(props) {

    var [user, setUser] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:5000/users/id/${props.user._id}`)
        .then(
            function(res) {
                setUser(res.data);
            }
        )
    }, []);

    // USE EFFECT ON USER TO GET CHECKLISTS

    if (props.user.checklists) {
        let userChecklist;
        let userChecklists = [];
        props.user.checklists.map(checklistId => {
            
            ChecklistDataService.get({ userId: props.user._id, checklistId: checklistId })
            .then(function(userChecklist) {
                userChecklists.push(userChecklist);
                console.log(userChecklist.data);
            });
            

        });
    }

    //TaskDataService.get('61ee3cb4eb7c7901e2784e67').then((res)=>{console.log(res)})
    
    
    let checklists;
    if (false) {
        checklists = (
            <>
                <div>
                    {user.checklists.map(checklist => (
                        <div className="checklist shadow" key={checklist['_id']}>
                            <div>{checklist.name}</div>
                            {checklist.items.map(item => (
                                <Listitem
                                    exists={true}
                                    user={user}
                                    item={item}
                                    checklist={checklist}
                                    text={item.text}
                                    checked={item.status}
                                    typing={false}
                                    key={item.key}
                                />
                            ))}
                            <Listitem exists={false} text={""} checked={false} typing={true} />
                        </div>
                    ))}
                </div>
            </>
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