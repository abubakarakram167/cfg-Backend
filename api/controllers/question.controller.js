/* Controller 1 */

const questionService = require('../dal/question.dao');
module.exports = {
          createOneQuestion,
          getOneQuestionByID,
          getListQuestionMultiple,
          deleteQuestion,
      
      };
      async function insertQuestion(questionData) {
        const question = { ...questionData };
        const questionDb = await questionService.add(question);
        const questionRaw = await questionDb.get({ plain: true });
    
        return questionRaw;
    }
    async function getByIDQuestion(questionData) {
        const question = { ...questionData };
        const questionDb = await questionService.getOneByID(question);
        const questionRaw = await questionDb.get({ plain: true });
    
        return questionRaw;
    }
    
    async function findAllQuestion() {
        const questionDb = await questionService.getList();
        return questionDb;
    }
    
    async function deleteByIDQuestion(questionData) {
        const question = { ...questionData };
        const questionDb = await questionService.deleteOne(question);
        return questionDb;
    }
    async function createOneQuestion(req, res) {
        const question = await insertQuestion(req.body);
        res.send(question);
    }
    
    async function getOneQuestionByID(req, res) {
        const question = await getByIDQuestion(req.params.id);
        res.send(question);
    }
    
    async function getListQuestionMultiple(_req, res) {
        const question = await findAllQuestion();
        res.send(question);
    }
    
    async function deleteQuestion(req, res) {
        const question = await deleteByIDQuestion(req);
        res.send(question);
    }
    
      