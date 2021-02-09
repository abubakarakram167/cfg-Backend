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
        return model.content_keywords.findOne(options);
    }
    
    function add(content_keyword) {
        return model.content_keywords.create({ ...content_keyword, createdAt: new Date() });
    }
    
    function findWhere(options) {
        return model.content_keywords.findAll(options);
    }
    function getList() {
        return model.content_keywords.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.content_keywords.destroy({
            where: { id: id },
        });
    }
      