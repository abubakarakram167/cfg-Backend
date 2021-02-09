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
        return model.gift_rewards.findOne(options);
    }
    
    function add(gift_reward) {
        return model.gift_rewards.create({ ...gift_reward, createdAt: new Date() });
    }
    
    function findWhere(options) {
        return model.gift_rewards.findAll(options);
    }
    function getList() {
        return model.gift_rewards.findAll();
    }
    function deleteOne(options) {
        const { id } = options.params;
        return model.gift_rewards.destroy({
            where: { id: id },
        });
    }
      