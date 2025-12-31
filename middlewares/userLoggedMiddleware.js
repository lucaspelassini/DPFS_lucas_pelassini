const { User } = require('../models');

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
 
    if (req.cookies.userEmail && !req.session.userLogged) {
        try {
            const userFromCookie = await User.findOne({
                where: { email: req.cookies.userEmail }
            });

            if (userFromCookie) {
                req.session.userLogged = {
                    id: userFromCookie.id,
                    firstName: userFromCookie.firstName,
                    lastName: userFromCookie.lastName,
                    email: userFromCookie.email,
                    category: userFromCookie.category,
                    image: userFromCookie.image
                };
            }
        } catch (error) {
            console.error('Error en userLoggedMiddleware:', error);
        }
    }
    
    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;