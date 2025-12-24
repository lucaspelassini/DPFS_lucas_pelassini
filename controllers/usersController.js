const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');

const getUsers = () => {
    const usersJSON = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(usersJSON);
};

const saveUsers = (users) => {
    const usersJSON = JSON.stringify(users, null, 2);
    fs.writeFileSync(usersFilePath, usersJSON);
};

const usersController = {
    login: (req, res) => {
        res.render('users/login', { 
            title: 'Login - Botánica.com',
            stylesheet: 'login'
        });
    },

    processLogin: (req, res) => {
        const users = getUsers();
        const { email, password, remember } = req.body;

        const user = users.find(u => u.email === email);

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

    processRegister: (req, res) => {
        const users = getUsers();

        const newId = users.length > 0 
            ? Math.max(...users.map(u => u.id)) + 1 
            : 1;

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const newUser = {
            id: newId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            category: 'user',
            image: req.file ? req.file.filename : 'default-avatar.jpg'
        };

        users.push(newUser);

        saveUsers(users);

        res.redirect('/users/login');
    },

    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('userEmail');
        res.redirect('/');
    }
};

module.exports = usersController;