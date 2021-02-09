/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('session_categories', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		category_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'categories',
				key: 'id'
			}
		},
		content_header_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'sessions',
				key: 'id'
			}
		}
	}, {
		tableName: 'session_categories',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
