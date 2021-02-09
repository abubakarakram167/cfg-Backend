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
        return model.content.findOne(options);
    }
    
    function add(content) {
        return model.content.create({ ...content, createdAt: new Date() });
    }
    
    function findWhere(options) {
        return model.content.findAll(options);
    }
    function getList() {
        return model.content.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.content.destroy({
            where: { id: id },
        });
    }
      