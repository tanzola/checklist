import React, { useState, useEffect } from "react";
import Checklist from './Checklist';
import UserDataService from '../services/user-service';

function Checklists(props) {

    const [numChecklistChanges, setNumChecklistChanges] = useState(0);
    const updateChecklists = () => { setNumChecklistChanges(numChecklistChanges + 1); }

    const [user, setUser] = useState({});
    useEffect(() => {
        UserDataService.getById(props.user._id)
        .then(function(res) { setUser(res.data); })
    }, [numChecklistChanges]);

    let checklists = null;
    let checklistPreexisting = {
        _id: 1,
        tasks: [],
        name: 'New List',
    }
    if (user.checklists) {        
        checklists = (
            <>
                {user.checklists.map(checklist => (
                    <Checklist
                        exists={true}
                        user={user}
                        checklist={checklist}
                        key={checklist._id}
                        updateChecklists={updateChecklists}
                    />
                ))}
                <Checklist
                    exists={false}
                    user={user}
                    checklist={checklistPreexisting}
                    key={numChecklistChanges}
                    updateChecklists={updateChecklists}
                />
            </>
        )
    }

    return(
        <>{checklists}</>
    )
}

export default Checklists;
