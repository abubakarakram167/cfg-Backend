/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('content_subscribers', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		content_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		subscription_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		status: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'content_subscribers',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
