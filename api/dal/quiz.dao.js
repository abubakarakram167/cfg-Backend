/* Data Access Object 1 */

const model = require('../models');
module.exports = {
          add,
          findWhere,
          getOneByID,
          getList,
          deleteOne,
      
      };
      function getOneByID(options) {
        return model.quiz.findOne(options);
    }
    
    function add(quiz) {
        return model.quiz.create({ ...quiz, createdAt: new Date() });
    }
    
    function findWhere(options) {
        return model.quiz.findAll(options);
    }
    function getList() {
        return model.quiz.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.quiz.destroy({
            where: { id: id },
        });
    }
      