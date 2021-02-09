/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('user_groups', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		group_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'groups',
				key: 'id'
			}
		},
		user_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			}
		}
	}, {
		tableName: 'user_groups',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('user_groups'),
};
