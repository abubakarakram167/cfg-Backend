/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const MediaCtrl = require('../controllers/media.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', MediaCtrl.createOneMedia);
        router.get('/list', MediaCtrl.getListMediaMultiple);
        router.get('/:id', MediaCtrl.getOneMediaByID);
        router.delete('/:id', MediaCtrl.deleteMedia);
        
      