/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('content_categories', {
		id: {
			type: DataTypes.INTEGER(11),
			primaryKey: true,
			allowNull: true
		},
		content_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'content',
				key: 'id'
			}
		},
		category_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'categories',
				key: 'id'
			}
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	}, {
		tableName: 'content_categories',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
