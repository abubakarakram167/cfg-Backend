/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const GiftRewardCtrl = require('../controllers/gift_rewards.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', GiftRewardCtrl.createOneGiftReward);
        router.get('/list', GiftRewardCtrl.getListGiftRewardMultiple);
        router.get('/:id', GiftRewardCtrl.getOneGiftRewardByID);
        router.delete('/:id', GiftRewardCtrl.deleteGiftReward);
        
      