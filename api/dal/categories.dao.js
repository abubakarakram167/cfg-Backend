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
        return model.categories.findOne(options);
    }
    
    function add(category) {
        return model.categories.create({ ...category, createdAt: new Date() });
    }
    
    function findWhere(options) {
        return model.categories.findAll(options);
    }
    function getList() {
        return model.categories.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.categories.destroy({
            where: { id: id },
        });
    }
      