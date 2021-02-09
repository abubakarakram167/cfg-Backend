/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('gift_rewards', {
		id: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: false
		},
		image_file: {
			type: Sequelize.DataTypes.STRING(255),
			allowNull: false
		},
		points_needed: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false
		},
		redeemed: {
			type: Sequelize.DataTypes.BOOLEAN,
			allowNull: false
		},
		created_by: {
			type: Sequelize.DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		created_at: {
			type: Sequelize.DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: Sequelize.DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'gift_rewards',
		}).then(() =>  {
	}),
	down: (queryInterface) => queryInterface.dropTable('gift_rewards'),
};
