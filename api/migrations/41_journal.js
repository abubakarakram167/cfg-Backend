/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('journal', {
        id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        subject: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        content_id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'content',
                key: 'id'
            }
        },
        start_date: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        end_date: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        track_my_goal: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        log_date: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        points: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
        },
        status: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        type: {
            type: Sequelize.DataTypes.ENUM(
                'goal',
                'journey',
                'journal'
            )
        },
        parent: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        
        created_by: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        updated_by: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
    }, {
        tableName: 'content',
    }).then(() => {
    }),
    down: (queryInterface) => queryInterface.dropTable('journal'),
};
