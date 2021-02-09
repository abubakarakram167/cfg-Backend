/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const CategoryCtrl = require('../controllers/categories.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', CategoryCtrl.createOneCategory);
        router.get('/list', CategoryCtrl.getListCategoryMultiple);
        router.get('/:id', CategoryCtrl.getOneCategoryByID);
        router.delete('/:id', CategoryCtrl.deleteCategory);
        
      