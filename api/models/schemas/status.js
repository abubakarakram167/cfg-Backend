/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('status', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		status_code: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		status_desription: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'status',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
