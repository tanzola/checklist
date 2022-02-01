import React, { useState, useEffect } from "react";
import Listitem from './Listitem';
import ChecklistDataService from '../services/checklist-service';
import './Checklist.css';

function Checklist(props) {
    let user = props.user;

    const [checklist, setChecklist] = useState({});
    useEffect(() => {
        ChecklistDataService.get({userId: props.user._id, checklistId: props.checklist._id})
        .then(function(res) { setChecklist(res.data); })
    }, []);
    
    let listitems = null;
    if (checklist.tasks) {
        listitems = (
            checklist.tasks.map(task => (
                <Listitem
                    exists={true}
                    user={user}
                    task={task}
                    checklist={checklist}
                    text={task.text}
                    checked={task.status}
                    typing={false}
                    key={task._id}
                />
            ))
        );
    }

    return (
        <>
            <div className="checklist" key={checklist._id}>
                <div className="checklist-title"><p>{checklist.name}</p></div>
                {listitems}
                {/* <Listitem exists={false} text={""} checked={false} typing={true} key={0} /> */}
            </div>
        </>
    )
}

export default Checklist;
