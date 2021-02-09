/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('content_keywords', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		group_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		keyword_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'keywords',
				key: 'id'
			}
		},
		content_detail_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'content',
				key: 'id'
			}
		}
	}, {
		tableName: 'content_keywords',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
