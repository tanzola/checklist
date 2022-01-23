import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Checklist.css';
import Listitem from './Listitem';
import ChecklistDataService from '../services/checklist-service';

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

    /*
    if (user.checklists) {
        console.log('----------DELETE CHECKLIST----------');
        try {
            ChecklistDataService.deleteChecklist('61ed9fb22a2b795af855e7fd', '61e3be6042bb223a2f20a327');
            console.log(5);
        }
        catch {
            console.log("Failed once")
        }
    }
    */
    /*
    if (user.checklists) {
        console.log('----------CREATE CHECKLIST-----------');
        try {
            ChecklistDataService.createChecklist(
                {
                    user_id: user._id,
                    name: "new checklist",
                    items: [
                        {
                            text: "we did it",
                            status: true
                        }
                    ]
                }
            );
            console.log(5);
        }
        catch {
            console.log("Failed once")
        }
    }
    */

    let checklists;
    if (user.checklists) {
        checklists = (
            <>
                <div>
                    {user.checklists.map(checklist => (
                        <div className="checklist shadow" key={checklist['_id']}>
                            <div>{checklist.name}</div>
                            {checklist.items.map(item => (
                                <Listitem
                                    exists={true}
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