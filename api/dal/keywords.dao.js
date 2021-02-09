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
        return model.keywords.findOne(options);
    }
    
    function add(keyword) {
        return model.keywords.create({ ...keyword, createdAt: new Date() });
    }
    
    function findWhere(options) {
        return model.keywords.findAll(options);
    }
    function getList() {
        return model.keywords.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.keywords.destroy({
            where: { id: id },
        });
    }
      