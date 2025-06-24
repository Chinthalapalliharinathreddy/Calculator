document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.calculator input[type="tel"]');
    const buttons = document.querySelectorAll('.calculator button');
    let currentInput = '';
    let result = '';
    let operator = '';
    let previousValue = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            if (buttonText >= '0' && buttonText <= '9') {
                currentInput += buttonText;
                display.value = currentInput;
            } else if (buttonText === 'AC') {
                currentInput = '';
                result = '';
                operator = '';
                previousValue = '';
                display.value = '';
            } else if (buttonText === 'Del') {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput;
            } else if (buttonText === 'Answer') {
                try {
                    if (currentInput) {
                        // Replace % with /100 for percentage calculation
                        const expression = currentInput.replace(/%/g, '/100');
                        result = eval(expression); // Using eval for simplicity, but note security concerns in production
                        display.value = result;
                        currentInput = String(result); // Set currentInput to the result for further operations
                    }
                } catch (error) {
                    display.value = 'Error';
                    currentInput = ''; // Clear input on error
                }
            } else if (['/', '*', '-', '+', '%'].includes(buttonText)) {
                // If there's already an input and it ends with an operator, replace it
                if (currentInput && ['/', '*', '-', '+', '%'].includes(currentInput.slice(-1))) {
                    currentInput = currentInput.slice(0, -1) + buttonText;
                } else if (currentInput) {
                    currentInput += buttonText;
                } else if (result !== '') { // If a calculation was just done, use its result
                    currentInput = String(result) + buttonText;
                }
                display.value = currentInput;
            }
        });
    });
});