/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const ContentCategoryCtrl = require('../controllers/content_categories.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', ContentCategoryCtrl.createOneContentCategory);
        router.get('/list', ContentCategoryCtrl.getListContentCategoryMultiple);
        router.get('/:id', ContentCategoryCtrl.getOneContentCategoryByID);
        router.delete('/:id', ContentCategoryCtrl.deleteContentCategory);
        
      