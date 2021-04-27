/* jshint indent: 1 */

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn(
      'user_posts',
      'title',
      {
        type: Sequelize.DataTypes.STRING(755),
        allowNull: true,
        after: "group_id"
      },
    );
    await queryInterface.addColumn(
      'user_posts',
      'timeline_id',
      {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'content',
          key: 'id'
        },
        after: "user_id"
      },
    );
    await queryInterface.addColumn(
      'user_posts',
      'publish_date',
      {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: true,
        after: "share_count"
      },
    );
    
    await queryInterface.addColumn(
      'user_posts',
      'assigned_group',
      {
        type: Sequelize.DataTypes.ENUM(
          'candidate',
          'facilitator',
          'content-manager',
          'support',
          'reviewer',
          'system-administrator',
          'auditor',
        ),
        allowNull: true,
        after: 'content'
      },
    );
    await queryInterface.addColumn(
      'user_posts',
      'status',
      {
        type: Sequelize.DataTypes.ENUM('published', 'saved', 'draft'),
        allowNull: false,
        after:'assigned_group'
      },
    );


  }
  ,
  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      'user_posts',
      'title',
    );
    await queryInterface.removeColumn(
      'user_posts',
      'timeline_id',
    );
    await queryInterface.removeColumn(
      'user_posts',
      'publish_date',
    );
    await queryInterface.removeColumn(
      'user_posts',
      'assigned_group',
    );
    await queryInterface.removeColumn(
      'user_posts',
      'status',
    );
  },
};
