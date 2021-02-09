/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('status', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		status_code: {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: true
		},
		status_desription: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'status',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('status'),
};
