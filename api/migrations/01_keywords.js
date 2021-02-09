/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('keywords', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		description: {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: false
		},
		IsDeleted: {
			type: Sequelize.DataTypes.BOOLEAN,
			allowNull: false
		}
	}, {
		tableName: 'keywords',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('keywords'),
};
