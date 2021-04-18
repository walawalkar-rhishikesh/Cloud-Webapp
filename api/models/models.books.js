const uuid = require('uuid');
module.exports = (sequelize, Sequelize) => {
    const Books = sequelize.define("books", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        isbn: {
            allowNull: false,
            type: Sequelize.BIGINT(20),
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        pdate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        quantity: {
            type: Sequelize.INTEGER,
            validate: {
                max: 999,
                min: 0
            },
            allowNull: false,
        },
        price: {
            type: Sequelize.DOUBLE,
            validate: {
                max: 9999.99,
                min: 0.01
            },
            allowNull: false,
        },
        createdby: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    });
    // Books.associate = models => {
    //     Books.hasMany(models.Carts);
    // }
    return Books;
};