const { User } = require('../models');
const bcrypt = require('bcryptjs');

const usersController = {
    login: (req, res) => {
        res.render('users/login', { 
            title: 'Login - Botánica.com',
            stylesheet: 'login'
        });
    },

    processLogin: async (req, res) => {
        try {
            const { email, password, remember } = req.body;

            const user = await User.findOne({
                where: { email: email }
            });

            if (user) {
                const validPassword = bcrypt.compareSync(password, user.password);

                if (validPassword) {
                    req.session.userLogged = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        category: user.category,
                        image: user.image
                    };

                    if (remember) {
                        res.cookie('userEmail', email, { maxAge: 1000 * 60 * 60 * 24 * 30 }); // 30 días
                    }

                    return res.redirect('/users/profile');
                }
            }

            return res.redirect('/users/login');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al procesar el login');
        }
    },

    profile: (req, res) => {
        res.render('users/profile', {
            title: 'Perfil - Botánica.com',
            stylesheet: 'profile',
            user: req.session.userLogged
        });
    },

    register: (req, res) => {
        res.render('users/register', { 
            title: 'Registro - Botánica.com',
            stylesheet: 'register'
        });
    },

    processRegister: async (req, res) => {
        try {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);

            await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashedPassword,
                category: 'user',
                image: req.file ? req.file.filename : 'default-avatar.jpg'
            });

            res.redirect('/users/login');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al crear el usuario');
        }
    },

    edit: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);

            if (user) {
                res.render('users/userEdit', {
                    title: 'Editar Usuario - Botánica.com',
                    stylesheet: 'forms',
                    user: user
                });
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al cargar el usuario');
        }
    },

update: async (req, res) => {
    try {
        const userId = req.params.id;

        await User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }, {
            where: { id: userId }
        });

        if (req.session.userLogged && req.session.userLogged.id == userId) {
            req.session.userLogged.firstName = req.body.firstName;
            req.session.userLogged.lastName = req.body.lastName;
            req.session.userLogged.email = req.body.email;
        }

        res.redirect('/users/profile');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el usuario');
    }
},

    detail: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);

            if (user) {
                res.render('users/userDetail', {
                    title: 'Detalle Usuario - Botánica.com',
                    stylesheet: 'profile',
                    user: user
                });
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener el usuario');
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('userEmail');
        res.redirect('/');
    }
};

module.exports = usersController;

