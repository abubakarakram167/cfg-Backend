/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('user_posts', {
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
	  group_id: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
		references: {
		  model: 'groups',
		  key: 'id'
		}
	  },
	  content: {
		type: DataTypes.TEXT,
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
	  createdAt: {
		field: 'created_at',
		type: 'TIMESTAMP',
		allowNull: true
	  },
	  updatedAt: {
		field: 'updated_at',
		type: 'TIMESTAMP',
		allowNull: true
	  }
	}, {
		tableName: 'user_posts',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
