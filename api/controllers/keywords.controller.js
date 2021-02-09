/* Controller 1 */

const keywordService = require('../dal/keywords.dao');
module.exports = {
          createOneKeyword,
          getOneKeywordByID,
          getListKeywordMultiple,
          deleteKeyword,
      
      };
      async function insertKeyword(keywordData) {
        const keyword = { ...keywordData };
        const keywordDb = await keywordService.add(keyword);
        const keywordRaw = await keywordDb.get({ plain: true });
    
        return keywordRaw;
    }
    async function getByIDKeyword(keywordData) {
        const keyword = { ...keywordData };
        const keywordDb = await keywordService.getOneByID(keyword);
        const keywordRaw = await keywordDb.get({ plain: true });
    
        return keywordRaw;
    }
    
    async function findAllKeyword() {
        const keywordDb = await keywordService.getList();
        return keywordDb;
    }
    
    async function deleteByIDKeyword(keywordData) {
        const keyword = { ...keywordData };
        const keywordDb = await keywordService.deleteOne(keyword);
        return keywordDb;
    }
    async function createOneKeyword(req, res) {
        const keyword = await insertKeyword(req.body);
        res.send(keyword);
    }
    
    async function getOneKeywordByID(req, res) {
        const keyword = await getByIDKeyword(req.params.id);
        res.send(keyword);
    }
    
    async function getListKeywordMultiple(_req, res) {
        const keyword = await findAllKeyword();
        res.send(keyword);
    }
    
    async function deleteKeyword(req, res) {
        const keyword = await deleteByIDKeyword(req);
        res.send(keyword);
    }
    
      