/* Data Access Object 1 */

const model = require('../models');
module.exports = {
  add,
  findWhere,
  getOneByID,
  getList,
  deleteOne,
  findQuizSpecificAquestion  
};
    function getOneByID(options) {
      return model.quiz_questions.findOne(options);
  }
  
  function add(quiz_question) {
      return model.quiz_questions.create({ ...quiz_question, createdAt: new Date() });
  }
  
  function findWhere(options) {
      return model.quiz_questions.findAll(options);
  }
  function findQuizSpecificAquestion(quizId) { 
    return model.quiz.findOne({
      where: {id: quizId},
      include: [
        {
          model: model.question,
          as: "questions"
        }
      ]
    })
  }

  function getList() {
    return model.quiz_questions.findAll();
  }

  function deleteOne(options) {
      const { id } = options.params;
      return model.quiz_questions.destroy({
          where: { id: id },
      });
  }
    