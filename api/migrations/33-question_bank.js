/* jshint indent: 1 */

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('question_bank', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		question: {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: false
		},
		detail:
		{
			type: Sequelize.DataTypes.TEXT,
			allowNull: true
		},
		is_deleted: {
			type: Sequelize.DataTypes.BOOLEAN,
			allowNull: false
		}
	}, {
		tableName: 'question_bank',
	}).then(() => {
	}),
	down: (queryInterface) => queryInterface.dropTable('question_bank'),
};
