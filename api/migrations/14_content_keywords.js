/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('content_keywords', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		group_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false
		},
		keyword_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'keywords',
				key: 'id'
			}
		},
		content_detail_id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'content',
				key: 'id'
			}
		}
	}, {
		tableName: 'content_keywords',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('content_keywords'),
};
