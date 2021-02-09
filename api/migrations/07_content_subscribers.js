/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('content_subscribers', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		content_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false
		},
		user_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		subscription_date: {
			type: Sequelize.DataTypes.DATE,
			allowNull: false
		},
		status: {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'content_subscribers',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('content_subscribers'),
};
