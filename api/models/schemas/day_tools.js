/* jshint indent: 1 */


module.exports = (sequelize, DataTypes) => sequelize.define('day_tools', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      tool_id1: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'content',
          key: 'id'
        }
      },
      tool_id2: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: 'content',
          key: 'id'
        }
      },
      tool_day:{
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      created_at: {
        type: 'TIMESTAMP',
        allowNull: true
      },
      updated_at: {
        type: 'TIMESTAMP',
        allowNull: true
      }
}, {
    tableName: 'day_tools',
    timestamps: false,
});
module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
