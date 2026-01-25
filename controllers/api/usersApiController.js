const { User } = require('../../models');

const usersApiController = {
    list: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const offset = (page - 1) * limit;

            const totalUsers = await User.count();
            const totalPages = Math.ceil(totalUsers / limit);

            const users = await User.findAll({
                attributes: ['id', 'firstName', 'lastName', 'email', 'image'],
                limit: limit,
                offset: offset,
                order: [['id', 'ASC']]
            });

            const usersFormatted = users.map(user => ({
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                detail: `/api/users/${user.id}`
            }));

            const baseUrl = `${req.protocol}://${req.get('host')}/api/users`;
            const nextPage = page < totalPages ? `${baseUrl}?page=${page + 1}` : null;
            const previousPage = page > 1 ? `${baseUrl}?page=${page - 1}` : null;

            res.json({
                count: totalUsers,
                totalPages: totalPages,
                currentPage: page,
                next: nextPage,
                previous: previousPage,
                users: usersFormatted
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    },

    detail: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId, {
                attributes: ['id', 'firstName', 'lastName', 'email', 'image', 'createdAt']
            });

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            res.json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: `/img/users/${user.image}`,
                createdAt: user.createdAt
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el usuario' });
        }
    }
};

module.exports = usersApiController;