const inputs = document.querySelectorAll('input');
const form = document.getElementById('createAccountForm');

inputs.forEach(input => {
    input.addEventListener('focusout', onInputFocusOut);
});

form.addEventListener('submit', onFormSubmit);

function onInputInvalid(input) {
    let errorElement;

    if (!input.nextElementSibling) {
        errorElement = document.createElement('span');
        errorElement.classList.add('input-error');
        input.parentElement.appendChild(errorElement);
    }

    errorElement = input.nextElementSibling;
    errorElement.innerText = getErrorMessage(input);

    input.parentElement.classList.remove('success');
    input.parentElement.classList.add('error');
    
}

function onInputValid(input) {
    input.parentElement.classList.remove('error');
    input.parentElement.classList.add('success');

    if (input.nextElementSibling) {
        input.nextElementSibling.remove();
    }
}

function onInputFocusOut(event) {
    if (validateSingleInput(event.target)) {
        onInputValid(event.target);
    } else {
        onInputInvalid(event.target);
    }
}

function validateSingleInput(input) {
    const nativeValidation = input.checkValidity();
    if (!nativeValidation) {
        return false;
    }

    if (input.name === 'password_confirm') {
        return validateMatchingPassword(input);
    }
    return true;
}

function validateInputs() {    
    inputs.forEach(input => {
        if (validateSingleInput(input)) {
            onInputValid(input);
        } else {
            onInputInvalid(input);
        }
    });
}

function onFormSubmit(event) {
    event.preventDefault();

    if (event.target.checkValidity()) {
        alert('La inscripción ha sido correcta');
    } else {
        validateInputs();
    }

    return;
}

function validateMatchingPassword(passwordConfirmInput) {
    const passwordInput = document.querySelector('[name="password"]');
    return passwordInput.value === passwordConfirmInput.value;
}

function getErrorMessage(input) {
    const validityState = input.validity;

    if (validityState.valueMissing) {
        return 'Rellene este campo';
    }
    if(input.type === 'email' && validityState.patternMismatch) {
        return 'Email inválido';
    }
    if (input.name === 'password' && validityState.patternMismatch) {
        return 'No debe tener más de 8 caracteres';
    }
    if (input.name === 'password_confirm') {
        return 'Las contraseñas no coinciden';
    }
}

