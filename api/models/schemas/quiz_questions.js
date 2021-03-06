/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('quiz_questions', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		quiz_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'quiz',
				key: 'id'
			}
		},
		question_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'question',
				key: 'id'
			}
		},
		created_by: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		deleted: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	}, {
		tableName: 'quiz_questions',
		timestamps: false
  });

	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
