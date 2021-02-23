module.exports = {
    up: async (queryInterface, Sequelize) => {      
        queryInterface.changeColumn('content', 'content_header_id', {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
			references: {
				model: 'content',
				key: 'id'
			}
        });
    },

    down: async (queryInterface, Sequelize) => {
      
    },
};
