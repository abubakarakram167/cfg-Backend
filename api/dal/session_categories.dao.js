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
        return model.session_categories.findOne(options);
    }
    
    function add(session_category) {
        return model.session_categories.create({ ...session_category, createdAt: new Date() });
    }
    
    function findWhere(options) {
        return model.session_categories.findAll(options);
    }
    function getList() {
        return model.session_categories.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.session_categories.destroy({
            where: { id: id },
        });
    }
      