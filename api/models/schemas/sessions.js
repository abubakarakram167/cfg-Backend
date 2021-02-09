

/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('sessions', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		content_name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		author: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		start_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		end_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		status: {
			type: DataTypes.ENUM('published','saved','draft',''),
			allowNull: true
		},
		total_points: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		featured_image_url: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		content_category: {
			type: DataTypes.ENUM('session','tool','event','mini-cfg',''),
			allowNull: true
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
		}
	}, {
		tableName: 'sessions',
		timestamps: false
	});
	module.exports.initRelations = () => {
		delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
	
	};
