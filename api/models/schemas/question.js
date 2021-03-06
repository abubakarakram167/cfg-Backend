/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('question', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		question: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		correct_answer: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		deleted: {
			type: DataTypes.BOOLEAN,
			allowNull: false
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true,
  },
	}, {
		tableName: 'question',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
