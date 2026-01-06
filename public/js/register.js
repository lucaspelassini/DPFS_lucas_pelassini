window.addEventListener('load', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(e) {
        let errors = false;
    
        const errorMessages = document.querySelectorAll('.error-msg-js');
        errorMessages.forEach(msg => msg.remove());
        
        const firstName = document.getElementById('firstName');
        if (firstName.value.trim().length < 2) {
            showError(firstName, 'El nombre debe tener al menos 2 caracteres');
            errors = true;
        }
        
        const lastName = document.getElementById('lastName');
        if (lastName.value.trim().length < 2) {
            showError(lastName, 'El apellido debe tener al menos 2 caracteres');
            errors = true;
        }
        
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError(email, 'Debe ser un email válido');
            errors = true;
        }
        
        const password = document.getElementById('password');
        if (password.value.length < 8) {
            showError(password, 'La contraseña debe tener al menos 8 caracteres');
            errors = true;
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
        if (!passwordRegex.test(password.value)) {
            showError(password, 'La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales');
            errors = true;
        }
        
        const password2 = document.getElementById('password2');
        if (password.value !== password2.value) {
            showError(password2, 'Las contraseñas no coinciden');
            errors = true;
        }
        
        const image = document.getElementById('image');
        if (image.files.length > 0) {
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const fileName = image.files[0].name.toLowerCase();
            const fileExtension = fileName.split('.').pop();
            
            if (!allowedExtensions.includes(fileExtension)) {
                showError(image, 'La imagen debe ser JPG, JPEG, PNG o GIF');
                errors = true;
            }
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