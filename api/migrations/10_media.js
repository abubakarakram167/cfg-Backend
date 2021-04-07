/* jshint indent: 1 */

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('media', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: true
		},
		description: {
			type: Sequelize.DataTypes.TEXT,
			allowNull: true
		},
		mime_type: {
			type: Sequelize.DataTypes.ENUM(
				'png',
				'jpeg',
				'jpg',
				'doc',
				'docx',
				'mp4',
				'mkv',

			),
			allowNull: false,
		},
		url: {
			type: Sequelize.DataTypes.TEXT,
			allowNull: true
		},
		file_name: {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: false,
		},
		is_global: {
			type: Sequelize.DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		category: {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: true,
		}, category: {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: true,
		},
		created_by: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		created_at: {
			type: Sequelize.DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: Sequelize.DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'media',
	}).then(() => {
	}),
	down: (queryInterface) => queryInterface.dropTable('media'),
};
