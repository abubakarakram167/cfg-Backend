module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.addColumn(
          'content',
          'facilitator',
          {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
          },
      );
      
      
  },

  down: async (queryInterface) => {
      await queryInterface.removeColumn(
          'content',
          'facilitator',
      );
      
     
  },
};
