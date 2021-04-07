/* jshint indent: 1 */

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('question', {
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
		correct_answer: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false
		},
		deleted: {
			type: Sequelize.DataTypes.BOOLEAN,
			allowNull: false
		}
	}, {
		tableName: 'question',
	}).then(() => {
	}),
	down: (queryInterface) => queryInterface.dropTable('question'),
};
