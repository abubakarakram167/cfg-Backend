/* Controller 1 */

const question_optionService = require('../dal/question_options.dao');
const bank_optionService = require('../dal/bank_options.dao');
module.exports = {
    createOneQuestionOption,
    getOneOptionByID,
    getListQuestionOptionMultiple,
    deleteQuestionOption,
    updateOption,
    getBankQuestionOptions
};
async function insertQuestionOption(question_optionData) {
    const question_option = { ...question_optionData };
    const question_optionDb = await question_optionService.add(question_option);
    var question_optionRaw = await question_optionDb.get({ plain: true });
    if(question_option.bank_id){
        question_option.question_id = question_option.bank_id;
        const bank_optionDb = await bank_optionService.add(question_option);
        const bank_optionRaw = await bank_optionDb.get({ plain: true });
        question_optionRaw.bank_id = bank_optionRaw.id;
    }
    

    return question_optionRaw;
}
async function getByIDQuestionOption(id) {
    const question_optionDb = await question_optionService.getOneByID({where:{id}});
    var question_optionRaw = null;
    if(question_optionDb !== null) {
        question_optionRaw = await question_optionDb.get({ plain: true });
    }
    

    return question_optionRaw;
}

async function findAllQuestionOption(qId) {
    const question_optionDb = await question_optionService.findWhere({where:{question_id:qId}});
    return question_optionDb;
}

async function deleteByIDQuestionOption(question_optionData) {
    const question_option = { ...question_optionData };
    const question_optionDb = await question_optionService.deleteOne(question_option);
    return question_optionDb;
}




async function createOneQuestionOption(req, res) {
    const question_option = await insertQuestionOption(req.body);
    res.send(question_option);
}



async function getOneOptionByID(req, res) {
    const question_option = await getByIDQuestionOption(req.params.id);
    res.send(question_option);
}



async function getListQuestionOptionMultiple(req, res) {
    const qId = req.params.questionId;
    const question_option = await findAllQuestionOption(qId);
    res.send(question_option);
}

async function updateOption(req,res){
    const id = req.params.id;
    const updatedData = req.body;
    const quiz = await question_optionService.update(updatedData , {where: {id}});
    if(quiz[0] == 1){
        res.send({ message:"Option updated successfully"});
    }else{
        res.send({ message:"Option updation failure"});
    }
    
}

async function deleteQuestionOption(req, res) {
    const question_option = await deleteByIDQuestionOption(req);
    if(question_option == 1){
        res.send({message:"Option Deleted Successfully"});
    }else{
        res.send({message:"Option Deletion Error"});
    }
    
}


//Question Bank Part Starts Here


async function getBankQuestionOptions(req, res) {
    const qId = req.params.questionId;
    const question_option = await bank_optionService.findWhere({where:{question_id:qId}});
    res.send(question_option);
}

