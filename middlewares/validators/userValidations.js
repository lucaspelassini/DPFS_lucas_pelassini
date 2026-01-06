const { body } = require('express-validator');
const { User } = require('../../models');

const registerValidations = [
    body('firstName')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    
    body('lastName')
        .notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un email válido')
        .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) {
                throw new Error('Este email ya está registrado');
            }
            return true;
        }),
    
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'),
    
    body('password2')
        .notEmpty().withMessage('Debes confirmar la contraseña')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
    
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

const loginValidations = [
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un email válido'),
    
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
];

const editValidations = [
    body('firstName')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    
    body('lastName')
        .notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un email válido')
        .custom(async (value, { req }) => {
            const user = await User.findOne({ where: { email: value } });
            if (user && user.id != req.params.id) {
                throw new Error('Este email ya está en uso');
            }
            return true;
        })
];

module.exports = {
    registerValidations,
    loginValidations,
    editValidations
};