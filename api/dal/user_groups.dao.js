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
        return model.user_groups.findOne(options);
    }
    
    function add(user_group) {
        return model.user_groups.create({ ...user_group, createdAt: new Date() });
    }
    
    function findWhere(options) {
        return model.user_groups.findAll(options);
    }
    function getList() {
        return model.user_groups.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.user_groups.destroy({
            where: { id: id },
        });
    }
      