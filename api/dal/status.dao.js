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
        return model.status.findOne(options);
    }
    
    function add(status) {
        return model.status.create({ ...status, createdAt: new Date() });
    }
    
    function findWhere(options) {
        return model.status.findAll(options);
    }
    function getList() {
        return model.status.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.status.destroy({
            where: { id: id },
        });
    }
      