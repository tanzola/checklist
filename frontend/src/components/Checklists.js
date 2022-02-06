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
                    checklist={{}}
                    key={numChecklistChanges}
                    updateChecklists={updateChecklists}
                />
            </>
        )
    }

    return(
        <section className="cl-section">{checklists}</section>
    )
}

export default Checklists;
