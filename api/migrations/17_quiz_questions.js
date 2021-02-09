/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('quiz_questions', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		quiz_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'quiz',
				key: 'id'
			}
		},
		question_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'question',
				key: 'id'
			}
		},
		created_by: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		created_at: {
			type: Sequelize.DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: Sequelize.DataTypes.DATE,
			allowNull: false
		},
		deleted: {
			type: Sequelize.DataTypes.BOOLEAN,
			allowNull: false
		}
	}, {
		tableName: 'quiz_questions',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('quiz_questions'),
};
