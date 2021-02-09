/* Controller 1 */

const quiz_questionService = require('../dal/quiz_questions.dao');
module.exports = {
          createOneQuizQuestion,
          getOneQuizQuestionByID,
          getListQuizQuestionMultiple,
          deleteQuizQuestion,
      
      };
      async function insertQuizQuestion(quiz_questionData) {
        const quiz_question = { ...quiz_questionData };
        const quiz_questionDb = await quiz_questionService.add(quiz_question);
        const quiz_questionRaw = await quiz_questionDb.get({ plain: true });
    
        return quiz_questionRaw;
    }
    async function getByIDQuizQuestion(quiz_questionData) {
        const quiz_question = { ...quiz_questionData };
        const quiz_questionDb = await quiz_questionService.getOneByID(quiz_question);
        const quiz_questionRaw = await quiz_questionDb.get({ plain: true });
    
        return quiz_questionRaw;
    }
    
    async function findAllQuizQuestion() {
        const quiz_questionDb = await quiz_questionService.getList();
        return quiz_questionDb;
    }
    
    async function deleteByIDQuizQuestion(quiz_questionData) {
        const quiz_question = { ...quiz_questionData };
        const quiz_questionDb = await quiz_questionService.deleteOne(quiz_question);
        return quiz_questionDb;
    }
    async function createOneQuizQuestion(req, res) {
        const quiz_question = await insertQuizQuestion(req.body);
        res.send(quiz_question);
    }
    
    async function getOneQuizQuestionByID(req, res) {
        const quiz_question = await getByIDQuizQuestion(req.params.id);
        res.send(quiz_question);
    }
    
    async function getListQuizQuestionMultiple(_req, res) {
        const quiz_question = await findAllQuizQuestion();
        res.send(quiz_question);
    }
    
    async function deleteQuizQuestion(req, res) {
        const quiz_question = await deleteByIDQuizQuestion(req);
        res.send(quiz_question);
    }
    
      