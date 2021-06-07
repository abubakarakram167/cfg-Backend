/* Authorization 1 */

const model = require('../models');
const express = require('express');
const QuestionCtrl = require('../controllers/question.controller');

const router = express.Router();
module.exports = router;

//router.post('/', QuestionOptionCtrl.createOneQuestionOption);
router.get('/list', QuestionCtrl.getBankQuestions);
//router.get('/:id', QuestionOptionCtrl.getOneOptionByID);
//router.put('/:id', QuestionOptionCtrl.updateOption);
//router.delete('/:id', QuestionOptionCtrl.deleteQuestionOption);

