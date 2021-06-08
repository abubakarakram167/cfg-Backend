/* Authorization 1 */

const model = require('../models');
const express = require('express');
const QuestionCtrl = require('../controllers/question.controller');

const router = express.Router();
module.exports = router;

//router.post('/', QuestionOptionCtrl.createOneQuestionOption);
router.get('/list', QuestionCtrl.getBankQuestions);
router.get('/:id', QuestionCtrl.getOneBankQuestionByID);
router.delete('/:id', QuestionCtrl.deleteBankQuestion);
router.put('/:id', QuestionCtrl.updateBankQuestion);
//router.delete('/:id', QuestionOptionCtrl.deleteQuestionOption);

