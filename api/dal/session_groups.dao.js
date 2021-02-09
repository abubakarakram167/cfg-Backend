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
        return model.session_groups.findOne(options);
    }
    
    function add(session_group) {
        return model.session_groups.create({ ...session_group, createdAt: new Date() });
    }
    
    function findWhere(options) {
        return model.session_groups.findAll(options);
    }
    function getList() {
        return model.session_groups.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.session_groups.destroy({
            where: { id: id },
        });
    }
      