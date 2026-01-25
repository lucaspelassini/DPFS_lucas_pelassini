const { Category } = require('../../models');

const categoriesApiController = {
    list: async (req, res) => {
        try {
            const categories = await Category.findAll({
                attributes: ['id', 'name']
            });

            res.json({
                categories: categories
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener categorías' });
        }
    }
};

module.exports = categoriesApiController;