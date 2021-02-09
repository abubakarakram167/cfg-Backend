/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('session_groups', {
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
		content_header_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'sessions',
				key: 'id'
			}
		}
	}, {
		tableName: 'session_groups',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('session_groups'),
};
