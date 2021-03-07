/* Authorization 1 */

const model = require('../models');
const express = require('express');
const QuestionCtrl = require('../controllers/question.controller');
const router = express.Router();
module.exports = router;

router.post('/', QuestionCtrl.createOneQuestion);
router.post('/editQuestion', QuestionCtrl.editQuestion);
router.get('/list', QuestionCtrl.getListQuestionMultiple);
router.get('/:id', QuestionCtrl.getOneQuestionByID);
router.delete('/:id', QuestionCtrl.deleteQuestion);
        
      