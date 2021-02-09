/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const KeywordCtrl = require('../controllers/keywords.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', KeywordCtrl.createOneKeyword);
        router.get('/list', KeywordCtrl.getListKeywordMultiple);
        router.get('/:id', KeywordCtrl.getOneKeywordByID);
        router.delete('/:id', KeywordCtrl.deleteKeyword);
        
      