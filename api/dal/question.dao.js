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
        return model.question.findOne(options);
    }
    
    function add(question) {
        return model.question.create({ ...question, createdAt: new Date() });
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
      