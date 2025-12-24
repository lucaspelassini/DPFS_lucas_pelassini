function isAuthenticated(req, res, next) {
    if (req.session.userLogged) {
        return next(); 
    }
    res.redirect('/users/login');
}

function isGuest(req, res, next) {
    if (!req.session.userLogged) {
        return next(); 
    }
    res.redirect('/users/profile'); 
}

module.exports = { isAuthenticated, isGuest };