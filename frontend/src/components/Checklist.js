import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Checklist.css';
import Listitem from './Listitem';

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

    const listitems = [
        {
            text: "hello",
            checked: true
        },
        {
            text: "oh hi",
            checked: false
        }
    ]

    let checklists;
    if (user.checklists) {
        checklists = (
            <>
                <div>
                    {user.checklists.map(checklist => (
                        <div className="checklist shadow" key={checklist['_id']}>
                            <div>{checklist.name}</div>
                            {console.log(checklist.items)}
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