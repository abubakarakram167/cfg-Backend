/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('quiz_assessments', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		assessment_title: {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: false
		},
		cfg_session_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			
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
		}
	}, {
		tableName: 'quiz_assessments',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('quiz_assessments'),
};
