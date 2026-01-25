const { Product, Category } = require('../../models');

const productsApiController = {
    list: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 1000;
            const offset = (page - 1) * limit;

            const totalProducts = await Product.count();
            const totalPages = Math.ceil(totalProducts / limit);

            const products = await Product.findAll({
                include: [
                    { association: 'category', attributes: ['id', 'name'] }
                ],
                limit: limit,
                offset: offset,
                order: [['id', 'DESC']]
            });

            const categories = await Category.findAll({
                include: [
                    { 
                        association: 'products',
                        attributes: []
                    }
                ],
                attributes: [
                    'id',
                    'name',
                    [Product.sequelize.fn('COUNT', Product.sequelize.col('products.id')), 'productCount']
                ],
                group: ['Category.id']
            });

            const countByCategory = {};
            categories.forEach(cat => {
                countByCategory[cat.name] = parseInt(cat.dataValues.productCount);
            });

            const productsFormatted = products.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                category: product.category ? product.category.name : null,
                detail: `/api/products/${product.id}`
            }));

            const baseUrl = `${req.protocol}://${req.get('host')}/api/products`;
            const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}` : null;
            const previousPage = page > 1 ? `${baseUrl}?page=${page - 1}` : null;

            res.json({
                count: totalProducts,
                totalPages: totalPages,
                currentPage: page,
                countByCategory: countByCategory,
                next: nextPage,
                previous: previousPage,
                products: productsFormatted
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener productos' });
        }
    },

    detail: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.findByPk(productId, {
                include: [
                    { association: 'category', attributes: ['id', 'name'] },
                    { association: 'colors', attributes: ['id', 'color'] }
                ]
            });

            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            res.json({
                id: product.id,
                name: product.name,
                description: product.description,
                price: parseFloat(product.price),
                category: product.category ? {
                    id: product.category.id,
                    name: product.category.name
                } : null,
                colors: product.colors ? product.colors.map(c => c.color) : [],
                image: `/img/${product.image}`,
                stock: product.stock,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el producto' });
        }
    },

    create: async (req, res) => {
        try {
            const { name, description, price, categoryId, stock } = req.body;

            const newProduct = await Product.create({
                name,
                description,
                price: parseFloat(price),
                categoryId: parseInt(categoryId),
                stock: parseInt(stock) || 0,
                image: 'default-product.jpg'
            });

            res.status(201).json({
                success: true,
                message: 'Producto creado exitosamente',
                product: newProduct
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el producto' });
        }
    },

    update: async (req, res) => {
        try {
            const productId = req.params.id;
            const { name, description, price, categoryId, stock } = req.body;

            const product = await Product.findByPk(productId);

            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            await Product.update({
                name,
                description,
                price: parseFloat(price),
                categoryId: parseInt(categoryId),
                stock: parseInt(stock) || 0
            }, {
                where: { id: productId }
            });

            const updatedProduct = await Product.findByPk(productId);

            res.json({
                success: true,
                message: 'Producto actualizado exitosamente',
                product: updatedProduct
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    },

    delete: async (req, res) => {
        try {
            const productId = req.params.id;

            const product = await Product.findByPk(productId);

            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            await Product.destroy({
                where: { id: productId }
            });

            res.json({
                success: true,
                message: 'Producto eliminado exitosamente'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    }
};

module.exports = productsApiController;