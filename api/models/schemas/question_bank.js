/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('question_bank', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    detail:
    {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'question_bank',
    timestamps: false
});

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
