/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const ContentKeywordCtrl = require('../controllers/content_keywords.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', ContentKeywordCtrl.createOneContentKeyword);
        router.get('/list', ContentKeywordCtrl.getListContentKeywordMultiple);
        router.get('/:id', ContentKeywordCtrl.getOneContentKeywordByID);
        router.delete('/:id', ContentKeywordCtrl.deleteContentKeyword);
        
      