const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

const getProducts = () => {
    const productsJSON = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(productsJSON);
};

const saveProducts = (products) => {
    const productsJSON = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsFilePath, productsJSON);
};

const productsController = {
    list: (req, res) => {
        const products = getProducts();
        res.render('products/productList', { 
            title: 'Productos - Botánica.com',
            stylesheet: 'products',
            products: products
        });
    },

    detail: (req, res) => {
        const products = getProducts();
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);
        
        if (product) {
            res.render('products/productDetail', { 
                title: 'Detalle Producto - Botánica.com',
                stylesheet: 'detail',
                product: product
            });
        } else {
            res.status(404).send('Producto no encontrado');
        }
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
        const products = getProducts();
        
        const newId = products.length > 0 
            ? Math.max(...products.map(p => p.id)) + 1 
            : 1;
        
        const newProduct = {
            id: newId,
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.filename : 'default.jpg',
            category: req.body.category,
            colors: req.body.colors ? req.body.colors.split(',').map(c => c.trim()) : [],
            price: parseFloat(req.body.price)
        };
        
        products.push(newProduct);
        
        saveProducts(products);
        
        res.redirect('/products');
    },

    edit: (req, res) => {
        const products = getProducts();
        const productId = parseInt(req.params.id);
        const product = products.find(p => p.id === productId);
        
        if (product) {
            res.render('products/productEdit', { 
                title: 'Editar Producto - Botánica.com',
                stylesheet: 'forms',
                product: product
            });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    },

    // Procesar edición (PUT - UPDATE)
update: (req, res) => {
    // AGREGAR ESTOS CONSOLE.LOG PARA DEBUGGEAR
    console.log('=== DEBUG UPDATE ===');
    console.log('req.params.id:', req.params.id);
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    console.log('===================');
    
    const products = getProducts();
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex !== -1) {
        // Actualizar producto
        products[productIndex] = {
            id: productId,
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.filename : products[productIndex].image,
            category: req.body.category,
            colors: req.body.colors ? req.body.colors.split(',').map(c => c.trim()) : [],
            price: parseFloat(req.body.price)
        };
        
        // Guardar en JSON
        saveProducts(products);
        
        res.redirect('/products/' + productId);
    } else {
        res.status(404).send('Producto no encontrado');
    }
},

    destroy: (req, res) => {
        const products = getProducts();
        const productId = parseInt(req.params.id);
        const filteredProducts = products.filter(p => p.id !== productId);
        
        saveProducts(filteredProducts);
        
        res.redirect('/products');
    }
};

module.exports = productsController;