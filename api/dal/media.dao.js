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
        return model.media.findOne(options);
    }
    
    function add(media) {
        return model.media.create({ ...media, createdAt: new Date() });
    }
    
    function findWhere(options) {
        return model.media.findAll(options);
    }
    function getList() {
        return model.media.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.media.destroy({
            where: { id: id },
        });
    }
      