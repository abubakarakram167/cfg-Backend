/* jshint indent: 1 */

module.exports = (sequelize, DataTypes) =>  sequelize.define('bank_options', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    option_description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    question_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
            model: 'question_bank',
            key: 'id'
        }
    },
    score: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    sequence_order: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    }
}, {
    tableName: 'bank_options',
    timestamps: false
});

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
