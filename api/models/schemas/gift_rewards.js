/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('gift_rewards', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		image_file: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		points_needed: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		redeemed: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		created_by: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'gift_rewards',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
