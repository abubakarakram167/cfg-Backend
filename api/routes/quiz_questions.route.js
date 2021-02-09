/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const QuizQuestionCtrl = require('../controllers/quiz_questions.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', QuizQuestionCtrl.createOneQuizQuestion);
        router.get('/list', QuizQuestionCtrl.getListQuizQuestionMultiple);
        router.get('/:id', QuizQuestionCtrl.getOneQuizQuestionByID);
        router.delete('/:id', QuizQuestionCtrl.deleteQuizQuestion);
        
      