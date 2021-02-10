/* Controller 1 */

const quizService = require('../dal/quiz.dao');

module.exports = {
    createOneQuiz,
    getOneQuizByID,
    getListQuizMultiple,
    deleteQuiz,

};
async function insertQuiz(quizData) {
    const quiz = { ...quizData };
    const quizDb = await quizService.add(quiz);
    const quizRaw = await quizDb.get({ plain: true });

    return quizRaw;
}
async function getByIDQuiz(quizData) {
    const quiz = { ...quizData };
    const quizDb = await quizService.getOneByID(quiz);
    const quizRaw = await quizDb.get({ plain: true });

    return quizRaw;
}

async function findAllQuiz() {
    const quizDb = await quizService.getList();
    return quizDb;
}

async function deleteByIDQuiz(quizData) {
    const quiz = { ...quizData };
    const quizDb = await quizService.deleteOne(quiz);
    return quizDb;
}
async function createOneQuiz(req, res) {
    const quiz = await insertQuiz(req.body);
    res.send(quiz);
}

async function getOneQuizByID(req, res) {
    const quiz = await getByIDQuiz(req.params.id);
    res.send(quiz);
}

async function getListQuizMultiple(_req, res) {
    const quiz = await findAllQuiz();
    res.send(quiz);
}

async function deleteQuiz(req, res) {
    const quiz = await deleteByIDQuiz(req);
    res.send(quiz);
}
