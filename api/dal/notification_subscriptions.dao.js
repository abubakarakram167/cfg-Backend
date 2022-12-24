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
      return model.notification_subscriptions.findOne(options);
  }
  
  function add(notification_subscription) {
      return model.notification_subscriptions.create({ ...notification_subscription, created_at: new Date() , 
        updated_at: new Date(), deleted:false });
  }
  
  function findWhere(options) {
      return model.notification_subscriptions.findAll(options);
  }

  function getList() {
    return model.notification_subscriptions.findAll();
  }

  function deleteOne(options) {
      const { id } = options.params;
      return model.notification_subscriptions.destroy({
          where: { id: id },
      });
  }
    