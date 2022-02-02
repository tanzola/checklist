import React, { useState } from 'react';
import imgAdd from '../img/add.svg';
import imgStage0 from '../img/taskStage-0.svg'
import imgStage1 from '../img/taskStage-1.svg'
import imgStage2 from '../img/taskStage-2.svg'
import imgDelete from '../img/delete.svg';
import TaskDataService from '../services/task-service';
import './Listitem.css';

const taskStages = [imgStage0, imgStage1, imgStage2];

function Listitem(props) {
    const [exists, setExists] = useState(props.exists);
    const [taskStage, setTaskStage] = useState(props.task.stage);
    const [taskText, setTaskText] = useState(props.task.text);
    const [isTyping, setTyping] = useState(props.typing);
    const [ogText, setOgText] = useState(props.task.text);

    function updateTask(data) {
        if (data.text !== undefined) {
            setTyping(false);
            if (data.text == ogText) { return; }
            if (!data.text.replace(/\s/g, "").length) { return; }
            setOgText(data.text);
            setTaskText(data.text);
        }
        if (data.stage !== undefined) {
            setTaskStage(data.stage);
        }
        try {
            TaskDataService.updateTask(
                {
                    _id: props.task._id,
                    userId: props.user._id,
                    text: data.text !== undefined ? data.text : taskText,
                    stage: data.stage !== undefined ? data.stage : taskStage
                }
            );
        }
        catch { console.log("failed to update task"); }
    }

    const checkmark = <div className={`checkmark`} onClick={() => { updateTask({ stage: (taskStage + 1) % 3 }) }}>
        <img src={taskStages[taskStage]} style={{ width: "100%" }} />
    </div>;
    const deleteButton = <img className="delete-button unselectable" src={imgDelete} alt="" />;
    const box_preexisting = <div className="preexisting" onClick={() => setExists(!exists)} />;
    const textInput = (
        <div className="input-container">
            <input className="input"
                defaultValue={taskText}
                onBlur={(e) => updateTask({ text: e.target.value })}
                onKeyDown={(e) => { if (e.key === 'Enter') { updateTask({ text: e.target.value }) } }}
                placeholder="New Task"
                spellCheck={false}
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
