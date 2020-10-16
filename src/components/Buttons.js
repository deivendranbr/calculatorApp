import React from 'react';
import './Buttons.css';

function Buttons(props) {
    return (
        <div className="buttons">
            <button onClick={props.onClear}>C</button>
            <button onClick={props.onOperator}>-</button>
            <button onClick={props.onOperator}>%</button>
            <button onClick={props.onOperator}>/</button>

            <button onClick={props.onDigit}>9</button>
            <button onClick={props.onDigit}>8</button>
            <button onClick={props.onDigit}>7</button>
            <button onClick={props.onOperator}>*</button>

            <button onClick={props.onDigit}>6</button>
            <button onClick={props.onDigit}>5</button>
            <button onClick={props.onDigit}>4</button>
            <button onClick={props.onOperator}>-</button>

            <button onClick={props.onDigit}>3</button>
            <button onClick={props.onDigit}>2</button>
            <button onClick={props.onDigit}>1</button>
            <button onClick={props.onOperator}>+</button>

            <button onClick={props.onDigit}>0</button>
            <button onClick={props.onDecimal}>.</button>
            <button class="long-btn" onClick={props.onEqual}>=</button>
        </div>
    )
}

export default Buttons;