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
      await queryInterface.addColumn(
        'content',
        'duration',
        {
          type: Sequelize.DataTypes.INTEGER(11),
          allowNull: true
        },
    );
      
      
  },

  down: async (queryInterface) => {
      await queryInterface.removeColumn(
          'content',
          'facilitator',
      );
      await queryInterface.removeColumn(
        'content',
        'duration',
    );
     
  },
};
