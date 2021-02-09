/* Controller 1 */

const session_categoryService = require('../dal/session_categories.dao');
module.exports = {
          createOneSessionCategory,
          getOneSessionCategoryByID,
          getListSessionCategoryMultiple,
          deleteSessionCategory,
      
      };
      async function insertSessionCategory(session_categoryData) {
        const session_category = { ...session_categoryData };
        const session_categoryDb = await session_categoryService.add(session_category);
        const session_categoryRaw = await session_categoryDb.get({ plain: true });
    
        return session_categoryRaw;
    }
    async function getByIDSessionCategory(session_categoryData) {
        const session_category = { ...session_categoryData };
        const session_categoryDb = await session_categoryService.getOneByID(session_category);
        const session_categoryRaw = await session_categoryDb.get({ plain: true });
    
        return session_categoryRaw;
    }
    
    async function findAllSessionCategory() {
        const session_categoryDb = await session_categoryService.getList();
        return session_categoryDb;
    }
    
    async function deleteByIDSessionCategory(session_categoryData) {
        const session_category = { ...session_categoryData };
        const session_categoryDb = await session_categoryService.deleteOne(session_category);
        return session_categoryDb;
    }
    async function createOneSessionCategory(req, res) {
        const session_category = await insertSessionCategory(req.body);
        res.send(session_category);
    }
    
    async function getOneSessionCategoryByID(req, res) {
        const session_category = await getByIDSessionCategory(req.params.id);
        res.send(session_category);
    }
    
    async function getListSessionCategoryMultiple(_req, res) {
        const session_category = await findAllSessionCategory();
        res.send(session_category);
    }
    
    async function deleteSessionCategory(req, res) {
        const session_category = await deleteByIDSessionCategory(req);
        res.send(session_category);
    }
    
      