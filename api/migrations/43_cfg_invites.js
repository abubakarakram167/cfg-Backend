/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('cfg_invites', {
        id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        cfg_id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'content',
                key: 'id'
            }
        },
        detail: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
        },
        link: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        token: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        status: {
            type: Sequelize.DataTypes.ENUM(
                'pending',
                'sent',
                'accepted',
                'rejected'
            ),
            allowNull: false,
        },
        created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        }
    }, {
        tableName: 'cfg_invites',
    }).then(() => {
    }),
    down: (queryInterface) => queryInterface.dropTable('cfg_invites'),
};
