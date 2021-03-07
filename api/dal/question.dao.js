/* Data Access Object 1 */

const model = require('../models');
module.exports = {
          add,
          findWhere,
          getOneByID,
          getList,
          deleteOne,
          editQuestion
      };
      function getOneByID(options) {
        return model.question.findOne(options);
    }
    
    function add(question) {
        return model.question.create({ ...question, createdAt: new Date() });
    }

    async function editQuestion(data) {
      await model.question.update({ 
        question: data.question, 
        detail: data.detail, 
        deleted: data.deleted }, 
        { where : { id : data.questionId }
      })
      let allOptions = [];
      console.log('the data.answers', data.answers)
      if(!data.answers.length) return;
      for (let i = 0; i< data.answers.length; i++){
        allOptions.push( model.question_options.update({ 
          option_description: data.answers[i].option
        }, 
          { where : { id : data.answers[i].id }
        }))
      }
      return await Promise.all(allOptions)
    }
    
    function findWhere(options) {
        return model.question.findAll(options);
    }
    function getList() {
        return model.question.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.question.destroy({
            where: { id: id },
        });
    }
      