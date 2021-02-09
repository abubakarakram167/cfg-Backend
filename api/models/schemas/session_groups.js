/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('session_groups', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		group_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'groups',
				key: 'id'
			}
		},
		content_header_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'sessions',
				key: 'id'
			}
		}
	}, {
		tableName: 'session_groups',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
