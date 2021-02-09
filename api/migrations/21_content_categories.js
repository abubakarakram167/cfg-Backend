/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('content_categories', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: true
		},
		content_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'content',
				key: 'id'
			}
		},
		category_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'categories',
				key: 'id'
			}
		},
		status: {
			type: Sequelize.DataTypes.BOOLEAN,
			allowNull: false
		}
	}, {
		tableName: 'content_categories',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('content_categories'),
};
