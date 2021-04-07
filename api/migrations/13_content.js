/* jshint indent: 1 */

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('content', {
        id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content_header_id: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'content',
                key: 'id'
            }
        },
        title: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        sub_title: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        detail: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
        },
        detail_json_meta:
        {
            type: Sequelize.DataTypes.JSON,
            allowNull: true,
        },
        start_date: {
            type: Sequelize.DataTypes.DATEONLY,
            allowNull: true,
        },
        end_date: {
            type: Sequelize.DataTypes.DATEONLY,
            allowNull: true,
        },
        status: {
            type: Sequelize.DataTypes.ENUM('published', 'saved', 'draft'),
            allowNull: false,
        },
        type: {
            type: Sequelize.DataTypes.ENUM(
                'reward',
                'tool',
                'session',
                'event',
                'mini',
                'timeline',
                'title',
                'sub-title'
            )
        },
        total_points: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
        },
        featured_image_url: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
        },
        event_type: {
            type: Sequelize.DataTypes.ENUM('live-video', 'group-chat', 'zoom-video', ''),
            allowNull: true,
        },
        tags: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        meta: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
        },
        previous_page: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        next_page: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
        },
        created_by: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: true,
        },
        created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
        },
    }, {
        tableName: 'content',
    }).then(() => {
    }),
    down: (queryInterface) => queryInterface.dropTable('content'),
};
