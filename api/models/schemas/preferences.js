/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('preferences', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		option_name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		option_value: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		option_description: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'preferences',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
