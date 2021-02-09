/* Controller 1 */

const gift_rewardService = require('../dal/gift_rewards.dao');
module.exports = {
          createOneGiftReward,
          getOneGiftRewardByID,
          getListGiftRewardMultiple,
          deleteGiftReward,
      
      };
      async function insertGiftReward(gift_rewardData) {
        const gift_reward = { ...gift_rewardData };
        const gift_rewardDb = await gift_rewardService.add(gift_reward);
        const gift_rewardRaw = await gift_rewardDb.get({ plain: true });
    
        return gift_rewardRaw;
    }
    async function getByIDGiftReward(gift_rewardData) {
        const gift_reward = { ...gift_rewardData };
        const gift_rewardDb = await gift_rewardService.getOneByID(gift_reward);
        const gift_rewardRaw = await gift_rewardDb.get({ plain: true });
    
        return gift_rewardRaw;
    }
    
    async function findAllGiftReward() {
        const gift_rewardDb = await gift_rewardService.getList();
        return gift_rewardDb;
    }
    
    async function deleteByIDGiftReward(gift_rewardData) {
        const gift_reward = { ...gift_rewardData };
        const gift_rewardDb = await gift_rewardService.deleteOne(gift_reward);
        return gift_rewardDb;
    }
    async function createOneGiftReward(req, res) {
        const gift_reward = await insertGiftReward(req.body);
        res.send(gift_reward);
    }
    
    async function getOneGiftRewardByID(req, res) {
        const gift_reward = await getByIDGiftReward(req.params.id);
        res.send(gift_reward);
    }
    
    async function getListGiftRewardMultiple(_req, res) {
        const gift_reward = await findAllGiftReward();
        res.send(gift_reward);
    }
    
    async function deleteGiftReward(req, res) {
        const gift_reward = await deleteByIDGiftReward(req);
        res.send(gift_reward);
    }
    
      