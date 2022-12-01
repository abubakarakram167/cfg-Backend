/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('notification_subscriptions', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
        token: {
            type: Sequelize.DataTypes.STRING(255),
            unique: true,
            allowNull: false,
        },
		created_at: {
			type: Sequelize.DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: Sequelize.DataTypes.DATE,
			allowNull: false
		},
		deleted: {
			type: Sequelize.DataTypes.BOOLEAN,
			allowNull: false
		}
	}, {
		tableName: 'notification_subscriptions',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('notification_subscriptions'),
};
