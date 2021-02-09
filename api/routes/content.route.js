/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const ContentCtrl = require('../controllers/content.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', ContentCtrl.createOneContent);
        router.get('/list', ContentCtrl.getListContentMultiple);
        router.get('/:id', ContentCtrl.getOneContentByID);
        router.delete('/:id', ContentCtrl.deleteContent);
        
      