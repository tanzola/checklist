import React, { useState, useEffect } from "react";
import '../components/DropdownMenu.css';

function DropdownMenu(props) {
    const [isOpen, setOpen] = useState(false);

    const dropdownButton = <img src={props.img} style={{width: props.size}} onClick={() => setOpen(!isOpen)} />
    
    const menu = (
        <div className="dropdown-menu">
            <div className="dropdown-content">
                <div className="dropdown-item">Rename</div>
                <div className="dropdown-item">Delete</div>
            </div>
        </div>
    )

    return (
        <>
            {dropdownButton}
            {isOpen ? menu : null}
        </>
    );
}

function DropdownItem(props) {
    return <div></div>
}

export default DropdownMenu;
