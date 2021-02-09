/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const ContentSubscriberCtrl = require('../controllers/content_subscribers.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', ContentSubscriberCtrl.createOneContentSubscriber);
        router.get('/list', ContentSubscriberCtrl.getListContentSubscriberMultiple);
        router.get('/:id', ContentSubscriberCtrl.getOneContentSubscriberByID);
        router.delete('/:id', ContentSubscriberCtrl.deleteContentSubscriber);
        
      