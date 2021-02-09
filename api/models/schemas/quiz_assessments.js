/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('quiz_assessments', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		assessment_title: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		cfg_session_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			
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
		}
	}, {
		tableName: 'quiz_assessments',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
