const productsController = {
    list: (req, res) => {
        res.render('products/productList', { 
            title: 'Productos - Botánica.com',
            stylesheet: 'products'
        });
    },

    detail: (req, res) => {
        const productId = req.params.id;
        res.render('products/productDetail', { 
            title: 'Detalle Producto - Botánica.com',
            stylesheet: 'detail',
            productId: productId
        });
    },

    cart: (req, res) => {
        res.render('products/productCart', { 
            title: 'Carrito - Botánica.com',
            stylesheet: 'cart'
        });
    },

    create: (req, res) => {
        res.render('products/productCreate', { 
            title: 'Crear Producto - Botánica.com',
            stylesheet: 'forms'
        });
    },

    store: (req, res) => {
        console.log(req.body);
        res.redirect('/products');
    },

    edit: (req, res) => {
        const productId = req.params.id;
        res.render('products/productEdit', { 
            title: 'Editar Producto - Botánica.com',
            stylesheet: 'forms',
            productId: productId
        });
    },

    update: (req, res) => {
        const productId = req.params.id;
        console.log('Actualizando producto:', productId, req.body);
        res.redirect('/products/' + productId);
    },

    destroy: (req, res) => {
        const productId = req.params.id;
        console.log('Eliminando producto:', productId);
        res.redirect('/products');
    }
};

module.exports = productsController;