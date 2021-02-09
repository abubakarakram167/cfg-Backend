/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('keywords', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		IsDeleted: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	}, {
		tableName: 'keywords',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
