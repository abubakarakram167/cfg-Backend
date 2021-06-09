/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('question_options', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		option_description: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		question_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'question',
				key: 'id'
			}
		},
		score:{
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		sequence_order: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		}
	}, {
		tableName: 'question_options',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
