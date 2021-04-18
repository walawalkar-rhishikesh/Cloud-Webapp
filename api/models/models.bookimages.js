const uuid = require('uuid');
module.exports = (sequelize, Sequelize) => {
    const BookImages = sequelize.define("bookimages", {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        pid: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'books',
                key: 'id'
            }
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        originalname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        key: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
    return BookImages;
};