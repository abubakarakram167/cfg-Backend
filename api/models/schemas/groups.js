/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('groups', {
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
	  name: {
		type: DataTypes.STRING(255),
		allowNull: false,
	  },
	  description: {
		type: DataTypes.STRING(255),
		allowNull: true,
	  },
	  featured_image_url: {
		type: DataTypes.STRING(255),
		allowNull: true,
	  },
	  cover_photo_url: {
		type: DataTypes.STRING(255),
		allowNull: true,
	  },
	  member_count: {
		type: DataTypes.INTEGER(11),
		allowNull: true,
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
	  }
	}, {
		tableName: 'groups',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
