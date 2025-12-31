const { Product, Category, ProductColor } = require('../models');
const { Op } = require('sequelize');

const productsController = {
    list: async (req, res) => {
        try {
            const products = await Product.findAll({
                include: [
                    { association: 'category' },
                    { association: 'colors' }
                ]
            });
            
            res.render('products/productList', { 
                title: 'Productos - Botánica.com',
                stylesheet: 'products',
                products: products
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener productos');
        }
    },

    detail: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.findByPk(productId, {
                include: [
                    { association: 'category' },
                    { association: 'colors' }
                ]
            });
            
            if (product) {
                res.render('products/productDetail', { 
                    title: 'Detalle Producto - Botánica.com',
                    stylesheet: 'detail',
                    product: product
                });
            } else {
                res.status(404).send('Producto no encontrado');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al obtener el producto');
        }
    },

    cart: (req, res) => {
        res.render('products/productCart', { 
            title: 'Carrito - Botánica.com',
            stylesheet: 'cart'
        });
    },

    create: async (req, res) => {
        try {
            const categories = await Category.findAll();
            
            res.render('products/productCreate', { 
                title: 'Crear Producto - Botánica.com',
                stylesheet: 'forms',
                categories: categories
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al cargar el formulario');
        }
    },

    store: async (req, res) => {
        try {
            const newProduct = await Product.create({
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
                categoryId: parseInt(req.body.category),
                image: req.file ? req.file.filename : 'default-product.jpg',
                stock: parseInt(req.body.stock) || 0
            });

            if (req.body.colors) {
                const colorsArray = req.body.colors.split(',').map(c => c.trim());
                
                for (const color of colorsArray) {
                    await ProductColor.create({
                        productId: newProduct.id,
                        color: color
                    });
                }
            }

            res.redirect('/products');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al crear el producto');
        }
    },

    edit: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.findByPk(productId, {
                include: [
                    { association: 'category' },
                    { association: 'colors' }
                ]
            });
            
            const categories = await Category.findAll();
            
            if (product) {
                res.render('products/productEdit', { 
                    title: 'Editar Producto - Botánica.com',
                    stylesheet: 'forms',
                    product: product,
                    categories: categories
                });
            } else {
                res.status(404).send('Producto no encontrado');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al cargar el producto');
        }
    },

    update: async (req, res) => {
        try {
            const productId = req.params.id;
            
            await Product.update({
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
                categoryId: parseInt(req.body.category),
                stock: parseInt(req.body.stock) || 0
            }, {
                where: { id: productId }
            });

            if (req.body.colors) {
                await ProductColor.destroy({
                    where: { productId: productId }
                });

                const colorsArray = req.body.colors.split(',').map(c => c.trim());
                
                for (const color of colorsArray) {
                    await ProductColor.create({
                        productId: productId,
                        color: color
                    });
                }
            }

            res.redirect('/products/' + productId);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al actualizar el producto');
        }
    },

    destroy: async (req, res) => {
        try {
            const productId = req.params.id;
            
            await Product.destroy({
                where: { id: productId }
            });

            res.redirect('/products');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al eliminar el producto');
        }
    },

    search: async (req, res) => {
        try {
            const searchTerm = req.query.q;
            
            const products = await Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${searchTerm}%`
                    }
                },
                include: [
                    { association: 'category' },
                    { association: 'colors' }
                ]
            });

            res.render('products/productList', { 
                title: 'Búsqueda - Botánica.com',
                stylesheet: 'products',
                products: products
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error en la búsqueda');
        }
    }
};

module.exports = productsController;