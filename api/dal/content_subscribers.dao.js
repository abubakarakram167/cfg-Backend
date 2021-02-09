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
        return model.content_subscribers.findOne(options);
    }
    
    function add(content_subscriber) {
        return model.content_subscribers.create({ ...content_subscriber, createdAt: new Date() });
    }
    
    function findWhere(options) {
        return model.content_subscribers.findAll(options);
    }
    function getList() {
        return model.content_subscribers.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.content_subscribers.destroy({
            where: { id: id },
        });
    }
      