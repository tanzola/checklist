import React, { useState } from 'react';
import imgAdd from '../img/add.svg';
import imgDelete from '../img/delete.svg';
import './Listitem.css'

function Listitem(props) {
    const [exists, setExists] = useState(props.exists);
    const [isChecked, setCheck] = useState(props.checked);
    const [isTyping, setTyping] = useState(props.typing);
    const [itemText, setItemText] = useState(props.text);
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

    function submitText(itemText) {
        console.log(props.task);
        /*
        try {
            TaskDataService.updateTask(
                {
                    _id: '61edc11d4acf3cdb46935a1a',
                    user_id: user._id,
                    name: thischecklist.name,
                    items: thischecklist.items
                }
            )
        }
        catch {
            console.log("Failed update")
        }
        */
    }

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
                    if (itemText !== ogText) {
                        submitText(e.target.value);
                        setOgText(e.target.value);
                        console.log('submit');
                    }
                }}
            >
                <input
                    type="text"
                    value={itemText}                    
                    onChange={(e) => { setItemText(e.target.value); }}
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
            <p>{itemText}</p>
        </div>
    )
    const checkmark = (
        <div
            className={isChecked ? "checkmark checked" : "checkmark unchecked"} 
            onClick={() => { setCheck(!isChecked); }}
        />
    );

    const deleteButton = (
        <img className="delete-button" src={imgDelete} alt='X' />
    );

    
    const box_preexisting = (
            <div className="preexisting" onClick={() => setExists(!exists)} />
    );

    const box_existing = (
        <div className="listitem">
            {checkmark}
            {isTyping ? box_text_typing : box_text_typed}
            {deleteButton}
        </div>
    );
    

    const testBox = (
        <div className='testbox' />
    );
    
    return(
        <>
            {exists ? box_existing : box_preexisting}
        </>
    );
}

export default Listitem;
