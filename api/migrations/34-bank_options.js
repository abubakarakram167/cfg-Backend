/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('bank_options', {
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
				model: 'question_bank',
				key: 'id'
			}
		},
		score: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false
		},
		sequence_order: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false
		}
	}, {
		tableName: 'bank_options',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('bank_options'),
};
