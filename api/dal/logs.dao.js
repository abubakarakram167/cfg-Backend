/* Data Access Object 1 */

const model = require('../models');
module.exports = {
          add,
          findWhere,
          getOneByID,
          getList,
          deleteOne,
          deleteMany
      };
      function getOneByID(options) {
        return model.logs.findOne(options);
    }
    
    function add(log) {
        return model.logs.create({ ...log, createdAt: new Date() });
    }
    
    function findWhere(options) {
        return model.logs.findAll(options);
    }
    function getList() {
        return model.logs.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.logs.destroy({
            where: { id: id },
        });
    }
    function deleteMany(ids) {
        return model.logs.destroy({
            where: { id: ids },
        });
    } 
    