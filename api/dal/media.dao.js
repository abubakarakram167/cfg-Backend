/* Data Access Object 1 */

const model = require('../models');
module.exports = {
          add,
          findWhere,
          getOneByID,
          addMany,
          getList,
          deleteOne,
      
      };
      function getOneByID(options) {
        return model.media.findOne(options);
    }
    
    function add(media) {
        return model.media.create({ ...media, createdAt: new Date() });
    }

    function addMany(media) {
        return model.media.bulkCreate(media, { returning: true });
    }
    
    function findWhere(options) {
        return model.media.findAll(options);
    }
    function getList(options) {
        return model.media.findAll(options);
    }
    function deleteOne(id) {
        
        return model.media.destroy({
            where: { id: id },
        });
    }
      