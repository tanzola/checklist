import React, { useState, useEffect } from "react";
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
            <>
                {user.checklists.map(checklist => (
                    <Checklist user={user} checklist={checklist} key={checklist._id} />
                ))}
            </>
        )
    }

    return(
        <>{checklists}</>
    )
}

export default Checklists;
