/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('session_categories', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		category_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'categories',
				key: 'id'
			}
		},
		content_header_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'sessions',
				key: 'id'
			}
		}
	}, {
		tableName: 'session_categories',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('session_categories'),
};
