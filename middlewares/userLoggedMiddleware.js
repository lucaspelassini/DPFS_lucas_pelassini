const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    if (req.cookies.userEmail && !req.session.userLogged) {
        const usersJSON = fs.readFileSync(usersFilePath, 'utf-8');
        const users = JSON.parse(usersJSON);

        const userFromCookie = users.find(u => u.email === req.cookies.userEmail);

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
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;