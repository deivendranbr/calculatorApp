import React, { useState, useEffect } from 'react';
import DisplayBar from './DisplayBar';
import Buttons from './Buttons';
import History from './History'
import worker_script from "../worker";
import * as Helper from '../Helper';
import * as LocalStorage from '../localStorage'
import './App.css';


function App() {
	const [formula, setFormula] = useState([]);
	const [input, setInput] = useState('0');
	const [afterCalculation, setAfterCalculation] = useState(false);
	const [isOperatorClicked, setIsOperatorClicked] = useState(false);
	const [history, setHistory] = useState(LocalStorage.getHistory());
	const [worker] = React.useState(new Worker(worker_script));

	useEffect(() => {
		worker.onmessage = (evt) => {
			LocalStorage.setHistory(evt.data);
		};
	});

	const onDigit = ({ target }) => {
		const digit = target.innerText;

		if (afterCalculation) {
			setInput(digit);
			setAfterCalculation(false);
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
		const decimal = target.innerText;

		if (afterCalculation) {
			setInput(`0${decimal}`);
			setAfterCalculation(false);
		} else if (Helper.isNotNumber(input)) {
			setInput(`0${decimal}`);
			setFormula(formula.concat(input));
		} else if (!input.includes(decimal)) {
			setInput(input.concat(decimal));
		}
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

		const newHistory = {
			formula: finalFormula,
			result: result
		}

		setFormula([]);
		setInput(result + '');
		setAfterCalculation(true);
		worker.postMessage(newHistory); 
		setHistory([].concat(history, newHistory));
	}

	const onBackspace = () => {
		const inputLength = input.length;
	
		if (input === 'Infinity' || input === '-Infinity' || input === 'NaN') {
			setInput('0');
			setAfterCalculation(false);
		} else if (inputLength > 1) {
			setInput(input.slice(0, inputLength - 1));
			setAfterCalculation(false);
		} else if (input !== '0') {
			setInput('0');
			setAfterCalculation(false);
		} else if (formula.length > 0) {
			setInput(formula[formula.length - 1]);
			setFormula(formula.slice(0, formula.length - 1));
			setAfterCalculation(false);
		}
	}

	const clearHistory = () => {
		LocalStorage.clearHistory();
		setHistory([]);
		setFormula([]);
		setInput(0);
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
					onBackspace={onBackspace}
				/>
			</div>
			{
				history.length > 0 && <button className="clear-history" onClick={clearHistory}>Clear History</button>
			}
			{
				history.length > 0 && <History data={history} />
			}
		</div>
	);
}

export default App;
