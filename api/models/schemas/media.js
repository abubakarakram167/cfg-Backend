/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('media', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		mime_type: {
			type: DataTypes.ENUM('png','jpeg','jpg','doc','docx','mp4','mkv',),
			allowNull: false,
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		is_global: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		created_by: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		file_name: {
			type: DataTypes.STRING(255),
			allowNull: false,
		}
	}, {
		tableName: 'media',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
