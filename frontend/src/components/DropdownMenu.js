import React, { useState, useEffect, useRef } from "react";
import $ from 'jquery';
import '../components/DropdownMenu.css';

function useWindowWidth() {
    const [width, setSize] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => { setSize(window.innerWidth); }
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener('resize', handleResize); }
    }, []);
    return width;
}

function DropdownMenu(props) {
    const ref = useRef();
    const [isOpen, setOpen] = useState(false);
    useEffect(() => {
        const checkClickOutside = (e) => { if (isOpen && ref.current && !ref.current.contains(e.target)) { setOpen(false); } }
        const checkEscape = (e) => { if (isOpen && e.key === 'Escape') { setOpen(false); } }
        document.addEventListener('mousedown', checkClickOutside);
        document.addEventListener('keydown', checkEscape);
        return () => {
            document.removeEventListener('mousedown', checkClickOutside);
            document.removeEventListener('keydown', checkEscape);
        }
    }, [isOpen]);

    const width = useWindowWidth();
    useEffect(() => {
        if (isOpen) {
            const iconRect = document.getElementById(props.iconId).getBoundingClientRect();
            const openMenu = document.getElementById(props.menuId);
            const menuRect = openMenu.getBoundingClientRect();
            const bodyRect = document.body.getBoundingClientRect();
            let x = 0
            let y = 0;
            if (props.anchorPos.top) { y -= iconRect.height; }
            if (props.anchorPos.right) { x += iconRect.width; }
            if (props.expandDir.left) { x -= menuRect.width; }
            if (props.expandDir.right) {
                let clippingRight = Math.min(bodyRect.width - iconRect.left - (props.anchorPos.left ? 0 : iconRect.width) - menuRect.width - props.extraCoords.x, 0);
                if (clippingRight) {
                    x -= menuRect.width + props.extraCoords.x * 2;
                    if (props.anchorPos.right) {
                        x -= iconRect.width;
                    }
                }
            }
            openMenu.style.left = iconRect.left + 'px';
            openMenu.style.transform = `translate(${x + props.extraCoords.x + "px"}, ${y + props.extraCoords.y + "px"})`
            openMenu.style.opacity = 1;
        }
    }, [isOpen, width]);

    const dropdownButton = (
        <img
            id={props.iconId}
            src={props.img}
            style={{ width: props.width }}
            onClick={() => setOpen(!isOpen)}
        />
    )

    const menu = (
        <div className="dropdown-menu" id={props.menuId}>
            {props.items.map(item => (
                <div className="dropdown-item" key={item.name} onClick={() => item.function()}>{item.name}</div>
            ))}
        </div>
    )

    return (
        <div ref={ref}>
            {dropdownButton}
            {isOpen ? menu : null}
        </div>
    );
}

export default DropdownMenu;
