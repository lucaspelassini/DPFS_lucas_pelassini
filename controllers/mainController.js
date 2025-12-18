const mainController = {
    index: (req, res) => {
        res.render('index', { 
            title: 'Home - Botánica.com',
            stylesheet: 'home'
        });
    }
};

module.exports = mainController;

