/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('media', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		mime_type: {
			type: DataTypes.ENUM(''),
			allowNull: true
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		is_global: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		created_by: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'media',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
