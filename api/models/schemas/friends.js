/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('friends', {
	id: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	  },
	  user1: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		references: {
		  model: 'users',
		  key: 'id'
		}
	  },
	  user2: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		references: {
		  model: 'users',
		  key: 'id'
		}
	  },
	  status: {
		type: DataTypes.ENUM(
		  'sent',
		  'deleted',
		  'accepted',
		),
		allowNull: false,
	  },
	  createdAt: {
		field: 'created_at',
		type: 'TIMESTAMP',
		defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		allowNull: false
	  },
	  updatedAt: {
		field: 'updated_at',
		type: 'TIMESTAMP',
		defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
		allowNull: false
	  },
	  deleted_at: {
		type: DataTypes.DATE,
		allowNull: true
	  }
	}, {
		tableName: 'friends',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
