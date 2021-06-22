module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('email_jobs', {
      id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      job_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      post_id: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'user_posts',
          key: 'id'
        }
      },
      status:
      {
        type: Sequelize.DataTypes.ENUM(
            'pending',
            'done',
        ),
        allowNull: false
    },
    created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
    },
    }, {
      tableName: 'email_jobs',
    }).then(() => {
    }),
    down: (queryInterface) => queryInterface.dropTable('email_jobs'),
  };
