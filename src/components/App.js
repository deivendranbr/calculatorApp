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
			setHistory([].concat(history, evt.data));
		};
	}, []);

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
	}

	const clearHistory = () => {
		LocalStorage.clearHistory();
		setHistory([]);
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
