const categoryService = require('../dal/categories.dao');

module.exports = {
    createOne,
    getOneByID,
    getListMultiple,
    deleteCategory,

};

async function insert(categoryData) {
    const category = { ...categoryData };
    const categoryDb = await categoryService.addCategory(category);
    const categoryRaw = await categoryDb.get({ plain: true });

    return categoryRaw;
}
async function getByID(categoryData) {
    const category = { ...categoryData };
    const categoryDb = await categoryService.getOneByID(category);
    const categoryRaw = await categoryDb.get({ plain: true });

    return categoryRaw;
}

async function findAll() {
    // const category = { ...categoryData };
    const categoryDb = await categoryService.getList();
    // const categoryRaw = await categoryDb.get({ plain: true });

    return categoryDb;
}

async function deleteByID(categoryData) {
    const category = { ...categoryData };
    const categoryDb = await categoryService.deleteCategory(category);    
    return categoryDb;
}
async function createOne(req, res) {
    const category = await insert(req.body);
    res.send(category);
}

async function getOneByID(req, res) {
    const category = await getByID(req.params.id);
    res.send(category);
}

async function getListMultiple(_req, res) {
    const category = await findAll();
    res.send(category);
}

async function deleteCategory(req, res) {
    const category = await deleteByID(req);
    res.send(category);
}
