/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('categories', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: true
		},
		description: {
			type: Sequelize.DataTypes.TEXT,
			allowNull: true
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
			allowNull: true
		},
		updated_at: {
			type: Sequelize.DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'categories',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('categories'),
};
