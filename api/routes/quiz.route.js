/* Authorization 1 */

const model = require('../models');
const express = require('express');
        const QuizCtrl = require('../controllers/quiz.controller');
        
        const router = express.Router();
        module.exports = router;
        
        router.post('/', QuizCtrl.createOneQuiz);
        router.get('/list', QuizCtrl.getListQuizMultiple);
        router.get('/:id', QuizCtrl.getOneQuizByID);
        router.delete('/:id', QuizCtrl.deleteQuiz);
        
      