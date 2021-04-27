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
		allowNull: true
	  },
	  updatedAt: {
		field: 'updated_at',
		type: 'TIMESTAMP',
		allowNull: true
	  }
	}, {
		tableName: 'feelings',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
