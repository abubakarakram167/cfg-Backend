/* Controller 1 */

const content_categoryService = require('../dal/content_categories.dao');

module.exports = {
    createOneContentCategory,
    getOneContentCategoryByID,
    getListContentCategoryMultiple,
    deleteContentCategory,

};
async function insertContentCategory(content_categoryData) {
    const content_category = { ...content_categoryData };
    const content_categoryDb = await content_categoryService.add(content_category);
    const content_categoryRaw = await content_categoryDb.get({ plain: true });

    return content_categoryRaw;
}
async function getByIDContentCategory(content_categoryData) {
    const content_category = { ...content_categoryData };
    const content_categoryDb = await content_categoryService.getOneByID(content_category);
    const content_categoryRaw = await content_categoryDb.get({ plain: true });

    return content_categoryRaw;
}

async function findAllContentCategory() {
    const content_categoryDb = await content_categoryService.getList();
    return content_categoryDb;
}

async function deleteByIDContentCategory(content_categoryData) {
    const content_category = { ...content_categoryData };
    const content_categoryDb = await content_categoryService.deleteOne(content_category);
    return content_categoryDb;
}
async function createOneContentCategory(req, res) {
    const content_category = await insertContentCategory(req.body);
    res.send(content_category);
}

async function getOneContentCategoryByID(req, res) {
    const content_category = await getByIDContentCategory(req.params.id);
    res.send(content_category);
}

async function getListContentCategoryMultiple(_req, res) {
    const content_category = await findAllContentCategory();
    res.send(content_category);
}

async function deleteContentCategory(req, res) {
    const content_category = await deleteByIDContentCategory(req);
    res.send(content_category);
}
