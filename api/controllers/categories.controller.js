/* Controller 1 */

const categoryService = require('../dal/categories.dao');
module.exports = {
          createOneCategory,
          getOneCategoryByID,
          getListCategoryMultiple,
          deleteCategory,
      
      };
      async function insertCategory(categoryData) {
        const category = { ...categoryData };
        const categoryDb = await categoryService.add(category);
        const categoryRaw = await categoryDb.get({ plain: true });
    
        return categoryRaw;
    }
    async function getByIDCategory(categoryData) {
        const category = { ...categoryData };
        const categoryDb = await categoryService.getOneByID(category);
        const categoryRaw = await categoryDb.get({ plain: true });
    
        return categoryRaw;
    }
    
    async function findAllCategory() {
        const categoryDb = await categoryService.getList();
        return categoryDb;
    }
    
    async function deleteByIDCategory(categoryData) {
        const category = { ...categoryData };
        const categoryDb = await categoryService.deleteOne(category);
        return categoryDb;
    }
    async function createOneCategory(req, res) {
        const category = await insertCategory(req.body);
        res.send(category);
    }
    
    async function getOneCategoryByID(req, res) {
        const category = await getByIDCategory(req.params.id);
        res.send(category);
    }
    
    async function getListCategoryMultiple(_req, res) {
        const category = await findAllCategory();
        res.send(category);
    }
    
    async function deleteCategory(req, res) {
        const category = await deleteByIDCategory(req);
        res.send(category);
    }
    
      