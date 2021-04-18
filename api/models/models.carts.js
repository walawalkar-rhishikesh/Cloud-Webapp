const uuid = require('uuid');
module.exports = (sequelize, Sequelize) => {
    const Carts = sequelize.define("carts", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        uid: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        pid: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'books',
                key: 'id'
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            validate: {
                max: 999,
                min: 0
            },
            allowNull: false,
        }
    });
    // Carts.associate = models => {
    //     Carts.belongsTo(models.Books, { targetKey: 'id', foreignKey: 'pid'})
    // }
    return Carts;
};