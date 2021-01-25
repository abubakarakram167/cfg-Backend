const model = require('../models');

module.exports = {
    addCategory,
    findWhere,
    getOneByID,
    getList,
    deleteCategory,

};

function getOneByID(options) {
    return model.category.findOne(options);
}

function addCategory(category) {
    return model.categories.create({ ...category, createdAt: new Date() });
}

function findWhere(options) {
    return model.categories.findAll(options);
}
function getList() {
    return model.categories.findAll();
}
function deleteCategory(options) {
    const { id } = options.params;
    console.log(id);
    return model.categories.destroy({
        where: { categoryId: id },
    });
}
