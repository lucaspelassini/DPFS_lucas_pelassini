window.addEventListener('load', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(e) {
        let errors = false;
        
        const errorMessages = document.querySelectorAll('.error-msg-js');
        errorMessages.forEach(msg => msg.remove());
        
        const inputs = document.querySelectorAll('.error');
        inputs.forEach(input => input.classList.remove('error'));
        
        const name = document.getElementById('name');
        if (name.value.trim().length < 5) {
            showError(name, 'El nombre debe tener al menos 5 caracteres');
            errors = true;
        }
    
        const description = document.getElementById('description');
        if (description.value.trim().length < 20) {
            showError(description, 'La descripción debe tener al menos 20 caracteres');
            errors = true;
        }
        
        const price = document.getElementById('price');
        if (!price.value || parseFloat(price.value) <= 0) {
            showError(price, 'El precio debe ser un número positivo');
            errors = true;
        }
    
        const category = document.getElementById('category');
        if (!category.value) {
            showError(category, 'Debes seleccionar una categoría');
            errors = true;
        }
        
        const stock = document.getElementById('stock');
        if (stock && stock.value && parseInt(stock.value) < 0) {
            showError(stock, 'El stock debe ser un número positivo');
            errors = true;
        }
        
        const image = document.getElementById('image');
        if (image && image.files.length > 0) {
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