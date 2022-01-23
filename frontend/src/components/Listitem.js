import React, { useState } from 'react';
import './Listitem.css'

function Listitem(props) {
    const [exists, setExists] = useState(props.exists);
    const [isChecked, setCheck] = useState(props.checked);
    const [isTyping, setTyping] = useState(props.typing);
    const [itemText, setItemText] = useState(props.text);

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
    
    const box_preexisting = <div className="preexisting" onClick={() => setExists(!exists)} />
    const box_existing = <> {checkbox} {isTyping ? box_text_typing : box_text_typed} </>

    return(
        <div className="listitem">
            {exists ? box_existing : box_preexisting}
        </div>
    );
}

export default Listitem;