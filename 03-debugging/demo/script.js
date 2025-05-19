function appendToDisplay(value) {
    const display = document.getElementById('display');
    const currentValue = display.value;

    if (['+', '-', '*', '/'].includes(value)) {
        if (currentValue && ['+', '-', '*', '/'].includes(currentValue.slice(-1))) {
            display.value = currentValue.slice(0, -1) + value;
        } else {
            display.value += value;
        }
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (error) {
        console.log(error);
        display.value = 'Error';
    }
}
