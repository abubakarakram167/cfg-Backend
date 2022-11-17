/* Authorization 1 */

const model = require('../models');
const express = require('express');
const notificationSubscriptionCtrl = require('../controllers/notification_subscriptions.controller');

const router = express.Router();
module.exports = router;

router.post('/', notificationSubscriptionCtrl.createOneSubscription);
//router.get('/list', notificationSubscriptionCtrl.getListSubscriptionMultiple);
router.get('/:id', notificationSubscriptionCtrl.getOneSubscriptionById);
router.put('/:id', notificationSubscriptionCtrl.updateSubscription);
router.delete('/:id', notificationSubscriptionCtrl.deleteSubscriptionByID);