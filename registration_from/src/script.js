// script.js

// Валідація форми
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    if (!validateForm()) {
        event.preventDefault();
    }
});

function validateForm() {
    let isValid = true;

    isValid &= validateName('firstName');
    isValid &= validateName('lastName');
    isValid &= validateEmail();
    isValid &= validatePassword();
    isValid &= validateTerms();

    return Boolean(isValid);
}

function validateName(id) {
    const input = document.getElementById(id);
    const regex = /^[A-Za-z]+$/;
    const errorMessage = `${id.charAt(0).toUpperCase() + id.slice(1)} can only contain letters.`;

    return handleValidation(input, regex, errorMessage);
}

function validateEmail() {
    const input = document.getElementById('email');
    const regex = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    const errorMessage = "Invalid email format.";

    return handleValidation(input, regex, errorMessage);
}

function validatePassword() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!#-]).{8,}$/;
    const errorMessage = "Password must contain at least 8 characters, one uppercase letter, one number, and one special character.";
    const matchError = "Passwords do not match.";

    const isPasswordValid = handleValidation(password, regex, errorMessage);
    const isMatch = password.value === confirmPassword.value;

    confirmPassword.style.borderColor = isMatch ? '#bbb' : 'red';
    displayError(confirmPassword, isMatch ? '' : matchError);

    return isPasswordValid && isMatch;
}

function validateTerms() {
    const terms = document.getElementById('terms');
    const errorMessage = "You must accept the terms and conditions.";

    if (!terms.checked) {
        alert(errorMessage);
        return false;
    }
    return true;
}

function handleValidation(input, regex, errorMessage) {
    const isValid = regex.test(input.value);
    input.style.borderColor = isValid ? '#bbb' : 'red';
    displayError(input, isValid ? '' : errorMessage);
    return isValid;
}

function displayError(input, message) {
    let errorElement = input.parentNode.querySelector('.error-message');

    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        input.parentNode.appendChild(errorElement);
    }

    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '5px';

    if (message === '') {
        errorElement.remove();
    }
}
