const { body } = require('express-validator');

const productValidations = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    
    body('description')
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
    
    body('price')
        .notEmpty().withMessage('El precio es obligatorio')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
    
    body('category')
        .notEmpty().withMessage('La categoría es obligatoria')
        .isInt().withMessage('Debe seleccionar una categoría válida'),
    
    body('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo'),
    
    body('image').custom((value, { req }) => {
        if (req.file) {
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
            
            if (!allowedExtensions.includes(fileExtension)) {
                throw new Error('La imagen debe ser JPG, JPEG, PNG o GIF');
            }
        }
        return true;
    })
];

module.exports = {
    productValidations
};