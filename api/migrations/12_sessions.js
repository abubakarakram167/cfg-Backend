/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('sessions', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		content_name: {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: false
		},
		author: {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: true
		},
		start_date: {
			type: Sequelize.DataTypes.DATE,
			allowNull: true
		},
		end_date: {
			type: Sequelize.DataTypes.DATE,
			allowNull: true
		},
		status: {
			type: Sequelize.DataTypes.ENUM('published','saved','draft',''),
			allowNull: true
		},
		total_points: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false
		},
		featured_image_url: {
			type: Sequelize.DataTypes.TEXT,
			allowNull: true
		},
		content_category: {
			type: Sequelize.DataTypes.ENUM('session','tool','event','mini-cfg',''),
			allowNull: true
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
		tableName: 'sessions',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('sessions'),
};
