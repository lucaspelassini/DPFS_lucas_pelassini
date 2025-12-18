const usersController = {
    login: (req, res) => {
        res.render('users/login', { 
            title: 'Login - Botánica.com',
            stylesheet: 'login'
        });
    },

    processLogin: (req, res) => {
        console.log('Login:', req.body);
        res.redirect('/');
    },

    register: (req, res) => {
        res.render('users/register', { 
            title: 'Registro - Botánica.com',
            stylesheet: 'register'
        });
    },

    processRegister: (req, res) => {
        console.log('Registro:', req.body);
        res.redirect('/users/login');
    },

    logout: (req, res) => {
        res.redirect('/');
    }
};

module.exports = usersController;