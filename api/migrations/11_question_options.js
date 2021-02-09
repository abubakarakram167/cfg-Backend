/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('question_options', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		option_description: {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: false
		},
		question_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'question',
				key: 'id'
			}
		},
		is_answer: {
			type: Sequelize.DataTypes.BOOLEAN,
			allowNull: false
		},
		sequence_order: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false
		}
	}, {
		tableName: 'question_options',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('question_options'),
};
