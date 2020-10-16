import React from 'react';
import './History.css';

function History(props) {
    return (
        <div className="history-container">
            {
                props.data.map((item, index) => {
                    return (
                        <div key={index} className="history-item">
                            {item.formula.join(" ")} = {item.result}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default History;