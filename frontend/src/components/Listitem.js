import React, { useState } from 'react';
import imgAdd from '../img/add.svg';
import imgDelete from '../img/delete.svg';
import TaskDataService from '../services/task-service';
import './Listitem.css';

function Listitem(props) {
    const [exists, setExists] = useState(props.exists);
    const [isChecked, setCheck] = useState(props.checked);
    const [taskText, setTaskText] = useState(props.text);
    const [isTyping, setTyping] = useState(props.typing);
    const [ogText, setOgText] = useState(props.text);
    
    function updateTaskText(taskText) {
        setTyping(false);
        if (taskText == null) { return; }
        if (taskText == ogText) { return; }
        if (!taskText.replace(/\s/g, "").length) { return; }
        setOgText(taskText);
        setTaskText(taskText)
        try {
            TaskDataService.updateTask(
                {
                    _id: props.task._id,
                    userId: props.user._id,
                    text: taskText,
                    status: props.task.status
                }
            );
        }
        catch { console.log("failed to update task"); }
    }

    const checkmark = <div className={isChecked ? "checkmark checked" : "checkmark unchecked"} onClick={() => { setCheck(!isChecked); }} />;
    const deleteButton = <img className="delete-button unselectable" src={imgDelete} alt="" />;
    const box_preexisting = <div className="preexisting" onClick={() => setExists(!exists)} />;
    const textInput = (
        <div className="input-container">
            <input className="input"
                defaultValue={taskText}
                onBlur={(e) => updateTaskText(e.target.value)}
                onKeyDown={(e) => {if (e.key === 'Enter') { updateTaskText(e.target.value) }}}
                placeholder="New Task"
                autoFocus
            />
        </div>
    )
    const textTyped = (
        <div className="box-text typed" onClick={() => setTyping(true)}>
            <p >{taskText}</p>
        </div>
    );

    const box_existing = (
        <div className="listitem">
            {checkmark}
            {isTyping ? textInput : textTyped}
            {deleteButton}
        </div>
    );
    
    return <>{exists ? box_existing : box_preexisting}</>;
}

export default Listitem;
