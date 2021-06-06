/* jshint indent: 1 */

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.removeColumn(
            'question',
            'correct_answer'
        );
        await queryInterface.removeColumn(
            'question',
            'deleted'
        );
        await queryInterface.addColumn(
            'question',
            'is_deleted',
            {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false
            }
        );
        await queryInterface.removeColumn(
            'question_options',
            'is_answer'
        );
        await queryInterface.addColumn(
            'question_options',
            'score',
            {
                type: Sequelize.DataTypes.INTEGER(11),
                allowNull: false
            }
        );
        await queryInterface.changeColumn(
            'quiz',
            'apply_to_group',
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
                allowNull: false
            }
        );

        await queryInterface.removeColumn(
            'quiz_questions',
            'deleted'
        );
        await queryInterface.addColumn(
            'quiz_questions',
            'is_deleted',
            {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false
            }
        );




    }
    ,
    down: async (queryInterface) => {


    },
};
