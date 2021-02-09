/* Controller 1 */

const question_optionService = require('../dal/question_options.dao');
module.exports = {
          createOneQuestionOption,
          getOneQuestionOptionByID,
          getListQuestionOptionMultiple,
          deleteQuestionOption,
      
      };
      async function insertQuestionOption(question_optionData) {
        const question_option = { ...question_optionData };
        const question_optionDb = await question_optionService.add(question_option);
        const question_optionRaw = await question_optionDb.get({ plain: true });
    
        return question_optionRaw;
    }
    async function getByIDQuestionOption(question_optionData) {
        const question_option = { ...question_optionData };
        const question_optionDb = await question_optionService.getOneByID(question_option);
        const question_optionRaw = await question_optionDb.get({ plain: true });
    
        return question_optionRaw;
    }
    
    async function findAllQuestionOption() {
        const question_optionDb = await question_optionService.getList();
        return question_optionDb;
    }
    
    async function deleteByIDQuestionOption(question_optionData) {
        const question_option = { ...question_optionData };
        const question_optionDb = await question_optionService.deleteOne(question_option);
        return question_optionDb;
    }
    async function createOneQuestionOption(req, res) {
        const question_option = await insertQuestionOption(req.body);
        res.send(question_option);
    }
    
    async function getOneQuestionOptionByID(req, res) {
        const question_option = await getByIDQuestionOption(req.params.id);
        res.send(question_option);
    }
    
    async function getListQuestionOptionMultiple(_req, res) {
        const question_option = await findAllQuestionOption();
        res.send(question_option);
    }
    
    async function deleteQuestionOption(req, res) {
        const question_option = await deleteByIDQuestionOption(req);
        res.send(question_option);
    }
    
      