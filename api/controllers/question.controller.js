/* Controller 1 */

const questionService = require('../dal/question.dao');
const bankService = require('../dal/question_bank.dao');
module.exports = {
    createOneQuestion,
    getOneQuestionByID,
    getListQuestionMultiple,
    deleteQuestion,
    updateQuestion,
    getBankQuestions
};
async function insertQuestion(questionData) {
    const question = { ...questionData };
    const questionDb = await questionService.add(question);
    var questionRaw = await questionDb.get({ plain: true });
    if (question.bank && question.bank === true) {
        const questionBankDb = await bankService.add(question);
        const bankRaw = await questionBankDb.get({ plain: true })
        questionRaw.bank_id = bankRaw.id
    }
    
    return questionRaw;
}
async function getByIDQuestion(questionData) {
    const question = { ...questionData };
    const questionDb = await questionService.getOneByID(question);
    const questionRaw = await questionDb.get({ plain: true });

    return questionRaw;
}

async function findAllQuestion() {
    const questionDb = await questionService.getList();
    return questionDb;
}

async function deleteByIDQuestion(questionData) {
    const question = { ...questionData };
    const questionDb = await questionService.deleteOne(question);
    return questionDb;
}
async function createOneQuestion(req, res) {
    const question = await insertQuestion(req.body);
    res.send(question);
}

async function getOneQuestionByID(req, res) {
    const question = await getByIDQuestion(req.params.id);
    res.send(question);
}

async function getListQuestionMultiple(_req, res) {
    const question = await findAllQuestion();
    res.send(question);
}

async function updateQuestion(req, res) {
    const id = req.params.id;
    const updatedData = req.body;
    const quiz = await questionService.update(updatedData, { where: { id } });
    if (quiz[0] == 1) {
        res.send({ message: "Question updated successfully" });
    } else {
        res.send({ message: "Question updation failure" });
    }

}

async function deleteQuestion(req, res) {
    const question = await deleteByIDQuestion(req);
    console.log(question);
    if (question == 1) {
        res.send({ message: "Question deleted successfully" });
    } else {
        res.send({ message: "Question deletion failure" });
    }
}


//Bank Portion Starts here
async function getBankQuestions(req,res){
    const questions = await bankService.getList();
    res.send(questions);
}
