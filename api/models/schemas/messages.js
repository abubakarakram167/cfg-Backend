/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('messages', {
	id: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	sent_by: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		references: {
			model: 'users',
			key: 'id'
		}
	},
	recieved_by: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		references: {
			model: 'users',
			key: 'id'
		}
	},
	text: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	html: {
		type: DataTypes.STRING(255),
		allowNull: true,
	},
	media_id:
	{
		type: DataTypes.INTEGER(11),
		allowNull: true,
		references: {
			model: 'media',
			key: 'id'
		}
	},
	status: {
		type: DataTypes.ENUM('sent', 'recieved', 'waiting','delivered'),
		allowNull: false,
	},
	type: {
		type: DataTypes.ENUM('text', 'video', 'image', 'file'),
		allowNull: false,
	},
	deleted_at: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	created_at: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	delivered_at: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	updated_at: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	}, {
		tableName: 'messages',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
