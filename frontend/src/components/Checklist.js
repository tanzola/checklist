import React, { useState, useEffect } from "react";
import Listitem from './Listitem';
import ChecklistDataService from '../services/checklist-service';
import TaskDataService from '../services/task-service';
import menuVert from '../img/menuVert.svg';
import DropdownMenu from '../components/DropdownMenu';
import imgAddList from '../img/addList.svg'
import './Checklist.css';

function Checklist(props) {
    let user = props.user;

    const [exists, setExists] = useState(props.exists);
    const [numTaskChanges, setNumTaskChanges] = useState(0);
    const updateTasks = () => { setNumTaskChanges(numTaskChanges + 1); }

    let [checklist, setChecklist] = useState(exists ? {} : props.checklist);
    useEffect(() => {
        if (props.exists) {
            ChecklistDataService.get({userId: props.user._id, checklistId: props.checklist._id})
            .then(function(res) {
                setChecklist(res.data);
            })
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

    function createChecklist() {
        setExists(true)
        try {
            ChecklistDataService.createChecklist({ userId: user._id, name: "New List" });
        } catch (e) { console.log(`failed to create new checklist, ${e}`); }
        props.updateChecklists();
    }

    function deleteChecklist() {
        try {
            const checklistId = { userId: props.user._id, checklistId: props.checklist._id }
            ChecklistDataService.deleteChecklist(checklistId)
            .then(
                checklist.tasks.forEach(task => {
                    try {
                        const taskId = { userId: props.user._id, taskId: task._id };
                        TaskDataService.deleteTask(taskId);
                    } catch (e) { console.log(`failed to delete task, ${e}`); }
                }))
            .then(props.updateChecklists);
        } catch (e) { console.log(`failed to delete checklist, ${e}`); }
    }

    let renderChecklist;
    if (exists) {
        renderChecklist = (
            <div className="cl" key={checklist._id}>
                <div className="cl-title">
                    <p>{checklist.name}</p>
                    <div className="menu-container">
                        <DropdownMenu
                            img={menuVert}
                            size={"20px"}
                            deleteChecklist={deleteChecklist}
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
                <div className="cl-preexisting">
                    <img className="unselectable" src={imgAddList} alt="" />
                </div>
            </div>
        );
    }
    
    return (
        <>{renderChecklist}</>
    )
}

export default Checklist;
