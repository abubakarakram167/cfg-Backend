/* jshint indent: 1 */
const model = require('../index');

module.exports = (sequelize, DataTypes) => sequelize.define('email_jobs', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    job_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    post_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: 'user_posts',
            key: 'id'
        }
    },
    status:
    {
        type: DataTypes.ENUM(
            'pending',
            'done',
        ),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'email_jobs',
    timestamps: false,
});
module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
    
    // Content belongs to groups
};
