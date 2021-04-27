/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) => sequelize.define('user_posts', {
	id: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	user_id: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		references: {
			model: 'users',
			key: 'id'
		}
	},
	timeline_id: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
		references: {
			model: 'content',
			key: 'id'
		},
	},
	group_id: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
		references: {
			model: 'groups',
			key: 'id'
		}
	},
	title: {
		type: DataTypes.STRING(755),
		allowNull: true,
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	assigned_group: {
		type: DataTypes.ENUM(
			'candidate',
			'facilitator',
			'content-manager',
			'support',
			'reviewer',
			'system-administrator',
			'auditor',
		),
		allowNull: true,

	},
	status: {
		type: DataTypes.ENUM('published', 'saved', 'draft'),
		allowNull: false,
	},
	feeling: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
		references: {
			model: 'feelings',
			key: 'id'
		}
	},
	media: {
		type: DataTypes.STRING(755),
		allowNull: true,
	},
	love_count: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
	},
	comment_count: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
	},
	share_count: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
	},
	publish_date:
	{
		type: DataTypes.DATEONLY,
		allowNull: true,
	},
	createdAt: {
		field: 'created_at',
		type: 'TIMESTAMP',
		allowNull: true
	},
	updatedAt: {
		field: 'updated_at',
		type: 'TIMESTAMP',
		allowNull: true
	},
	deletedAt: {
		type: DataTypes.DATE,
		allowNull: true,
		field: 'deleted_at',
	},
}, {
	tableName: 'user_posts',
	timestamps: false
});
module.exports.initRelations = () => {
	delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
