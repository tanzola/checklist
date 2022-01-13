import React from 'react';
import Listitem from './Listitem';

const listitems = [
    {
        text: "hello",
        checked: true
    },
    {
        text: "oh hi",
        checked: false
    }
]

function Checklist() {
    return(
        <div classname="checklist">
            {listitems.map(item => 
                <Listitem 
                    exists={true}
                    text={item.text}
                    checked={item.checked}
                    typing={false}
                />
            )}
            <Listitem exists={false} text={""} checked={false} typing={true} />
        </div>
    )
}

export default Checklist;