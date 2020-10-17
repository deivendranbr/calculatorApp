import React from 'react';
import './DisplayBar.css';

function DisplayBar(props) {
    return (
        <div className="display-container">
            <textarea className="display-formula" value={props.formula.join("")} readOnly= {true}></textarea>
            <textarea className="display-input" id="display" rows="1" value={props.input} readOnly= {true}></textarea>
        </div>
    )
}

export default DisplayBar;