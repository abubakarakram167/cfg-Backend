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
        return model.content_categories.findOne(options);
    }
    
    function add(content_category) {
        return model.content_categories.create({ ...content_category, createdAt: new Date() });
    }
    
    function findWhere(options) {
        return model.content_categories.findAll(options);
    }
    function getList() {
        return model.content_categories.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.content_categories.destroy({
            where: { id: id },
        });
    }
      