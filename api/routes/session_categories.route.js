/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const SessionCategoryCtrl = require('../controllers/session_categories.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', SessionCategoryCtrl.createOneSessionCategory);
        router.get('/list', SessionCategoryCtrl.getListSessionCategoryMultiple);
        router.get('/:id', SessionCategoryCtrl.getOneSessionCategoryByID);
        router.delete('/:id', SessionCategoryCtrl.deleteSessionCategory);
        
      