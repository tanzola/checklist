import React, { useState, useEffect } from "react";
import axios from 'axios';
import Listitem from './Listitem';

function Checklist(props) {
    let user = props.user;

    const [checklist, setChecklist] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:5000/users/id/${props.user._id}/checklist/${props.checklist._id}`)
        .then(function(res) { setChecklist(res.data); })
    }, []);

    let listitems = null;
    if (checklist.tasks) {
        listitems = (
            checklist.tasks.map(task => (
                <Listitem
                    exists={true}
                    user={user}
                    item={task}
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
            <div className="checklist shadow" key={checklist._id}>
                <div>{checklist.name}</div>
                {listitems}
                <Listitem exists={false} text={""} checked={false} typing={true} key={0} />
            </div>
        </>
    )
}

export default Checklist;