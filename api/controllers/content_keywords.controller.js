/* Controller 1 */

const content_keywordService = require('../dal/content_keywords.dao');
module.exports = {
          createOneContentKeyword,
          getOneContentKeywordByID,
          getListContentKeywordMultiple,
          deleteContentKeyword,
      
      };
      async function insertContentKeyword(content_keywordData) {
        const content_keyword = { ...content_keywordData };
        const content_keywordDb = await content_keywordService.add(content_keyword);
        const content_keywordRaw = await content_keywordDb.get({ plain: true });
    
        return content_keywordRaw;
    }
    async function getByIDContentKeyword(content_keywordData) {
        const content_keyword = { ...content_keywordData };
        const content_keywordDb = await content_keywordService.getOneByID(content_keyword);
        const content_keywordRaw = await content_keywordDb.get({ plain: true });
    
        return content_keywordRaw;
    }
    
    async function findAllContentKeyword() {
        const content_keywordDb = await content_keywordService.getList();
        return content_keywordDb;
    }
    
    async function deleteByIDContentKeyword(content_keywordData) {
        const content_keyword = { ...content_keywordData };
        const content_keywordDb = await content_keywordService.deleteOne(content_keyword);
        return content_keywordDb;
    }
    async function createOneContentKeyword(req, res) {
        const content_keyword = await insertContentKeyword(req.body);
        res.send(content_keyword);
    }
    
    async function getOneContentKeywordByID(req, res) {
        const content_keyword = await getByIDContentKeyword(req.params.id);
        res.send(content_keyword);
    }
    
    async function getListContentKeywordMultiple(_req, res) {
        const content_keyword = await findAllContentKeyword();
        res.send(content_keyword);
    }
    
    async function deleteContentKeyword(req, res) {
        const content_keyword = await deleteByIDContentKeyword(req);
        res.send(content_keyword);
    }
    
      