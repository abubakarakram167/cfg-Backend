/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('feelings', {
	id: {
		type: DataTypes.INTEGER(11),
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	  },
	  feeling: {
		type: DataTypes.STRING(255),
		allowNull: false,
	  },
	  description: {
		type: DataTypes.STRING(255),
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
	  }
	}, {
		tableName: 'feelings',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
