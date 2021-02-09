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
        return model.sessions.findOne(options);
    }
    
    function add(session) {
        return model.sessions.create({ ...session, createdAt: new Date() });
    }
    
    function findWhere(options) {
        return model.sessions.findAll(options);
    }
    function getList() {
        return model.sessions.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.sessions.destroy({
            where: { id: id },
        });
    }
      