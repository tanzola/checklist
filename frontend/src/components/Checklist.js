import React, { useState, useEffect, useRef } from "react";
import Listitem from './Listitem';
import ChecklistDataService from '../services/checklist-service';
import TaskDataService from '../services/task-service';
import menuVert from '../img/menuVert.svg';
import DropdownMenu from '../components/DropdownMenu';
import imgAddList from '../img/addList.svg'
import './Checklist.css';

function Checklist(props) {
    const ref = useRef();
    const user = props.user;

    const [exists, setExists] = useState(props.exists);
    const [isTyping, setTyping] = useState(false);
    const [numTaskChanges, setNumTaskChanges] = useState(0);
    const updateTasks = () => { setNumTaskChanges(numTaskChanges + 1); }
    const [checklist, setChecklist] = useState(exists ? {} : props.checklist);

    //const[checklistName, setChecklistName] = useState(props.checklist.name === undefined ? 'New List' : props.checklist.name);

    useEffect(() => {
        const checkClickOutside = (e) => {
            if (isTyping && ref.current && !ref.current.contains(e.target)) {
                updateChecklist();
                setTyping(false);
            }
        }
        const checkEscape = (e) => {
            if (isTyping && e.key === 'Escape') {
                setTyping(false);
            }
        }
        document.addEventListener('mousedown', checkClickOutside);
        document.addEventListener('keydown', checkEscape);
        return () => {
            document.removeEventListener('mousedown', checkClickOutside);
            document.removeEventListener('keydown', checkEscape);
        }
    }, [isTyping]);

    function createChecklist() {
        setExists(true)
        try {
            ChecklistDataService.createChecklist({ userId: user._id, name: "New List" })
                .then(props.updateChecklists());
        } catch (e) { console.log(`failed to create checklist, ${e}`); }
    }

    function deleteChecklist() {
        try {
            ChecklistDataService.deleteChecklist({ userId: user._id, checklistId: checklist._id })
                .then(
                    checklist.tasks.forEach(task => {
                        try { TaskDataService.deleteTask({ userId: user._id, taskId: task._id }); }
                        catch (e) { console.log(`failed to delete task, ${e}`); }
                    }))
                .then(props.updateChecklists);
        } catch (e) { console.log(`failed to delete checklist, ${e}`); }
    }

    function updateChecklist(data) {
        /*
        try {
            ChecklistDataService.updateChecklist(
                { userId: user._id, checklistId: checklist._id, name: name }
            ).then(props.updateChecklists);
        } catch (e) { console.log(`failed to rename checklist, ${e}`); }
        */
       setTyping(false);
       console.log('checklist updating..')
    }

    
    useEffect(() => {
        if (props.exists) {
            ChecklistDataService.get({ userId: user._id, checklistId: props.checklist._id })
                .then((res) => { setChecklist(res.data); })
        }
    }, [numTaskChanges]);

    const [listitems, setListitems] = useState(null);
    useEffect(() => {
        if (checklist.tasks) {
            const tasks = Array();
            checklist.tasks.map(task => (
                tasks.push(
                    <Listitem
                        exists={true}
                        isNew={false}
                        user={user}
                        task={task}
                        checklist={checklist}
                        text={task.text}
                        taskStage={task.stage}
                        typing={false}
                        key={task._id}
                        updateTasks={updateTasks}
                    />
                )
            ));
            tasks.push(
                <Listitem
                    exists={false}
                    isNew={true}
                    user={user}
                    checklist={checklist}
                    text={""}
                    taskStage={0}
                    typing={true}
                    key={numTaskChanges}
                    updateTasks={updateTasks}
                />
            )
            setListitems(tasks);
        }
    }, [checklist, user, exists]);
    
    const textInput = (
        <input className="cl-input"
            ref={ref}
            id="cl-input"
            defaultValue={checklist.name}
            //onBlur={(e) => updateChecklist({ text: e.target.value })}
            onKeyDown={(e) => {
                if (e.key === 'Enter') { updateChecklist({ name: e.target.value }); }
                if (e.key === 'Escape') { setTyping(false); }
            }}
            placeholder={props.name}
            spellCheck={false}
            autoFocus
        />
    );
    

    function rename() {
        setTyping(true);
        setTimeout(() => {
            document.getElementById("cl-input").focus()
        }, 1);
    }
    
    let renderChecklist;
    if (exists) {
        renderChecklist = (
            <div className="cl" key={checklist._id}>
                <div className="cl-title">
                    {isTyping ? textInput : <p>{checklist.name}</p>}
                    <div className="menu-container unselectable">
                        <DropdownMenu
                            iconId={"cl-menu-icon"}
                            menuId={"cl-menu"}
                            img={menuVert}
                            width={"20px"}
                            items={[
                                { name: "Rename", function: rename },
                                { name: "Delete", function: deleteChecklist }
                            ]}
                            anchorPos = {{ top: true, left: true }}
                            expandDir = {{ left: true }}
                            extraCoords = {{ x: -5, y: -7 }}
                        />
                    </div>
                </div>
                {listitems}
            </div>
        );
    }
    else {
        renderChecklist = (
            <div className="cl" key={checklist._id} onClick={() => createChecklist()}>
                <div className="cl-preexisting unselectable">
                    <img src={imgAddList} alt="" />
                </div>
            </div>
        );
    }

    return (
        <div className="cl-container">{renderChecklist}</div>
    )
}

export default Checklist;
