document.getElementById('calculate').addEventListener('click', () => {
    const num1 = document.getElementById('number1').value;
    const num2 = document.getElementById('number2').value;

    const result = num1 + num2;

    document.getElementById('result').innerText = 'Result: ' + result;
});
