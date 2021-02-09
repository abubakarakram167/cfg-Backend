/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('groups', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		description: {
			type: Sequelize.DataTypes.TEXT,
			allowNull: true
		},
		private_group: {
			type: Sequelize.DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: '1'
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
		tableName: 'groups',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('groups'),
};
