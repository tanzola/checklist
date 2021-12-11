import React, { useState } from 'react';
import './checkbox.css'

function Checkbox() {
    const [isChecked, setCheck] = useState(false);
    const [isTyping, setTyping] = useState(false);
    const [itemText, setItemText] = useState("");

    const checkbox = <div className={isChecked ? "box_check checked" : "box_check unchecked"} onClick={() => setCheck(!isChecked)} />;
    
    const box_text_typing = (
        <div className="box_text typing">
            <form onSubmit={() => setTyping(!isTyping)} className="textform">
                <input
                    type="text"
                    value={itemText}
                    onChange={(e) => setItemText(e.target.value)}
                    onBlur={() => setTyping(!isTyping)}
                    className="iteminput"
                    autoFocus
                />
            </form>
        </div>
    )

    const box_text_typed = (
        <div className="box_text typed" onClick={() => setTyping(!isTyping)}>
            <p className="itemtext"> {itemText} </p>
        </div>
    )
    
    return(
        <div classname="checklist">
            <div className="listitem">
                {checkbox}
                {isTyping ? box_text_typing : box_text_typed}
            </div>
        </div>
    );
}

export default Checkbox;