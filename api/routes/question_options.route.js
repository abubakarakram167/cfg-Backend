/* Authorization 1 */

const model = require('../models');
const express = require('express');
const QuestionOptionCtrl = require('../controllers/question_options.controller');

const router = express.Router();
module.exports = router;

router.post('/', QuestionOptionCtrl.createOneQuestionOption);
router.get('/list/:questionId', QuestionOptionCtrl.getListQuestionOptionMultiple);
router.get('/:id', QuestionOptionCtrl.getOneOptionByID);
router.put('/:id', QuestionOptionCtrl.updateOption);
router.delete('/:id', QuestionOptionCtrl.deleteQuestionOption);

