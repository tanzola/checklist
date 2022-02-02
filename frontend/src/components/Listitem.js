import React, { useState } from 'react';
import { TextInput } from 'react-native-web';
import imgAdd from '../img/add.svg';
import imgDelete from '../img/delete.svg';
import TaskDataService from '../services/task-service';
import './Listitem.css'

function Listitem(props) {
    const [exists, setExists] = useState(props.exists);
    const [isChecked, setCheck] = useState(props.checked);
    const [taskText, settaskText] = useState(props.text);
    const [isTyping, setTyping] = useState(props.typing);
    const [ogText, setOgText] = useState(props.text);
    
    /*
    function updateItem(args) {
        if (props.task) {
            if (args.checked != undefined) {
                props.task.checked = args.checked;
            }
            if (args.text != undefined) {
                props.task.text = args.text;
            }
        }
    }
    */

    function updateTask(taskText, taskStatus) {
        console.log(props.task);
        try {
            TaskDataService.updateTask(
                {
                    _id: props.task._id,
                    userId: props.user._id,
                    text: taskText,
                    status: taskStatus
                }
            );
        }
        catch { console.log("Failed update"); }
    }

    const checkmark = <div className={isChecked ? "checkmark checked" : "checkmark unchecked"} onClick={() => { setCheck(!isChecked); }} />;
    const deleteButton = <img className="delete-button" src={imgDelete} alt="" />;
    const box_preexisting = <div className="preexisting" onClick={() => setExists(!exists)} />;
    const box_text_typing = (
        <div className="box_text typing">
            <form
                className="textform"
                onFocus={(e) => {
                    setOgText(e.target.value);
                    console.log("onFocus,", e.target.value);
                }}
                onSubmit={(e) => {
                    setTyping(!isTyping);
                    if (taskText !== ogText) {
                        // updateTask(e.target.value, isChecked);
                        setOgText(e.target.value);
                        console.log('submit');
                    }
                }}
            >
                <input
                    type="text"
                    value={taskText}                    
                    onChange={(e) => { settaskText(e.target.value); }}
                    onBlur={() => {
                        setTyping(!isTyping);
                        console.log("onBlur");
                        console.log(ogText);
                    }}
                    className="iteminput"
                    autoFocus
                />
            </form>
        </div>
    );
    const box_text_typed = (
        <div className="box_text typed" onClick={() => setTyping(!isTyping)}>
            <p>{taskText}</p>
        </div>
    );
    const box_existing = (
        <div className="listitem">
            {checkmark}
            {isTyping ? box_text_typing : box_text_typed}
            {deleteButton}
        </div>
    );
    
    return <>{exists ? box_existing : box_preexisting}</>;
}

export default Listitem;
