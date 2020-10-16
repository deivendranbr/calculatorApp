import React from 'react';
import './DisplayBar.css';

function DisplayBar(props) {
    return (
        <div class="display-container">
            <textarea className="display-formula" value={props.formula.join("")} ></textarea>
            <textarea className="display-input" id="display" rows="1" value={props.input}></textarea>
        </div>
    )
}

export default DisplayBar;