/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('messages', {
        id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        sent_by: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        recieved_by: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        text: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: false,
        },
        html: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        media_id:
        {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'media',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.DataTypes.ENUM('sent', 'recieved', 'waiting','delivered'),
            allowNull: false,
        },
        type: {
            type: Sequelize.DataTypes.ENUM('text', 'video', 'image', 'file'),
            allowNull: false,
        },
        deleted_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
        },
        delivered_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: 'messages',
    }).then(() => {
    }),
    down: (queryInterface) => queryInterface.dropTable('messages'),
};
