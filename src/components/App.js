import React, { useState } from 'react';
import './App.css';
import DisplayBar from './DisplayBar';
import Buttons from './Buttons';

import * as Helper from '../Helper';



function App() {
	const [formula, setFormula] = useState([]);
	const [input, setInput] = useState('0');
	const [afterCalculation, setAfterCalculation] = useState(false);
	const [isOperatorClicked, setIsOperatorClicked] = useState(false);
	const [history, setHistory] = useState([]);

	const onDigit = ({ target }) => {
		const digit = target.innerText;

		if (afterCalculation) {
			setInput(digit);
			setAfterCalculation(false)
			if (isOperatorClicked) {
				setFormula(formula.concat(input));
			}
		} else if (input === '0') {
			setInput(digit);
		} else if (isOperatorClicked && Helper.isNotNumber(input)) {
			setInput(digit);
			setFormula(formula.concat(input));
		} else {
			setInput(input.concat(digit));
		}
		setIsOperatorClicked(false);
	}

	const onDecimal = ({ target }) => {
		
	}

	const onOperator = ({ target }) => {
		const operator = target.innerText;

		if (input === operator) {
			return;
		}
		console.log(Helper);
		if (Helper.isNumber(input)) {
			setFormula(formula.concat(input));
		}
		setInput(operator);
		setIsOperatorClicked(true);
	}

	const onClear = () => {
		setInput('0');
		setFormula([]);
		setAfterCalculation(false);
	}

	const onEqual = () => {
		const finalFormula = formula.concat(input);
		const result = Helper.calculate(finalFormula);

		const newHistoryItem = {
			formula: finalFormula,
			result: result
		}

		setFormula([]);
		setInput(result + '');
		setAfterCalculation(true);
		setHistory([].concat(newHistoryItem, history));
		console.log(history);
	}

	return (
		<div className="App">
			<div className="container">
				<DisplayBar 
					formula={formula}
					input={input}
				/>
				<Buttons 
					onClear={onClear}
					onEqual={onEqual}
					onDecimal={onDecimal}
					onDigit={onDigit}
					onOperator={onOperator}
				/>
			</div>
		</div>
	);
}

export default App;
