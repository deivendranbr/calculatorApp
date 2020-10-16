export function isNotNumber(input) {
    return input === '+' || input === '-' || input === '*' || input === '/' || input === '%';
}
  
export function isNumber(input) {
    return !isNotNumber(input);
}

export function isOperator(input) {
    return input === '+' || input === '-' || input === '*' || input === '/' || input === '%';
}
  
export function getPriority(input) {
    if (input === '+' || input === '-') return 1;
    else if (input === '*' || input === '/' || input === '%') return 2;
    return 0;
}

export function calculate(calcInputArray) {
    const arrangedInputArray = arrange(calcInputArray);
    return calculateResult(arrangedInputArray);
}

export function arrange(calcInputArray) {
    let result = [], stack = [];
  
    calcInputArray.forEach(item => {
        if (isNumber(item)) {
            result.push(item);
        } else {
            while (stack.length > 0) {
            const existingOperator = stack[stack.length - 1];
    
            if (isOperator(existingOperator) && getPriority(existingOperator) >= getPriority(item)) {
                result.push(existingOperator);
                stack.pop();
            } else break;
            }
    
            stack.push(item);
        }
    });
  
    while (stack.length > 0) {
      result.push(stack.pop());
    }
  
    return result;
}

export function calculateResult(arrangedInputArray) {
    let stack = [];
  
    arrangedInputArray.forEach(item => {
        if (isNumber(item)) {
            stack.push(item);
        } else {
            const num1 = Number.parseFloat(stack.pop()), num2 = Number.parseFloat(stack.pop());
            let result = '';
    
            switch (item) {
            case '+':
                result = num2 + num1;
                break;
            case '-':
                result = num2 - num1;
                break;
            case '*':
                result = num2 * num1;
                break;
            case '/':
                result = num2 / num1;
                break;
            case '%':
                result = num2 % num1;
                break;
            default:
                console.log('error..!');
            }
    
            stack.push(result + '');
        }
    });
  
    return Number.parseFloat(stack[0]);
}