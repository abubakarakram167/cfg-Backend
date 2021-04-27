/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('comments', {
	id: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	  },
	  created_by: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		references: {
		  model: 'users',
		  key: 'id'
		}
	  },
	  post_id: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		references: {
		  model: 'user_posts',
		  key: 'id'
		}
	  },
	  parent_id: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
		references: {
		  model: 'comments',
		  key: 'id'
		}
	  },
	  content: {
		type: DataTypes.TEXT,
		allowNull: false,
	  },
	  love_count: {
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
	  },
	  deleted_at:{
		type: DataTypes.DATE,
		allowNull: true,
	  }
	}, {
		tableName: 'comments',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
