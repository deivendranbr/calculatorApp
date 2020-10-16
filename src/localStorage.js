export const getHistory = () => {
    var history = localStorage.getItem('calcHistory');
    return history ? JSON.parse(history) : [];
}

export const setHistory = (data) => {
    if (!localStorage.getItem('calcHistory')) {
        localStorage.setItem('calcHistory', JSON.stringify([data]));
    } else {
        var history = JSON.parse(localStorage.getItem('calcHistory'));
        history.push(data);
        localStorage.setItem('calcHistory', JSON.stringify(history));
    }
}