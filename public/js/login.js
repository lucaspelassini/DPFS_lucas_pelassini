window.addEventListener('load', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(e) {
        let errors = false;
      
        const errorMessages = document.querySelectorAll('.error-msg-js');
        errorMessages.forEach(msg => msg.remove());
        
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'El email es obligatorio');
            errors = true;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Debe ser un email válido');
            errors = true;
        }
        
        const password = document.getElementById('password');
        if (!password.value.trim()) {
            showError(password, 'La contraseña es obligatoria');
            errors = true;
        }
        
        if (errors) {
            e.preventDefault();
        }
    });
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = document.createElement('small');
        error.className = 'error-msg error-msg-js';
        error.textContent = message;
        formGroup.appendChild(error);
        input.classList.add('error');
    }
});