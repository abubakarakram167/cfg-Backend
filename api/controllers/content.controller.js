/* Controller 1 */

const contentService = require('../dal/content.dao');
module.exports = {
          createOneContent,
          getOneContentByID,
          getListContentMultiple,
          deleteContent,
      
      };
      async function insertContent(contentData) {
        const content = { ...contentData };
        const contentDb = await contentService.add(content);
        const contentRaw = await contentDb.get({ plain: true });
    
        return contentRaw;
    }
    async function getByIDContent(contentData) {
        const content = { ...contentData };
        const contentDb = await contentService.getOneByID(content);
        const contentRaw = await contentDb.get({ plain: true });
    
        return contentRaw;
    }
    
    async function findAllContent() {
        const contentDb = await contentService.getList();
        return contentDb;
    }
    
    async function deleteByIDContent(contentData) {
        const content = { ...contentData };
        const contentDb = await contentService.deleteOne(content);
        return contentDb;
    }
    async function createOneContent(req, res) {
        const content = await insertContent(req.body);
        res.send(content);
    }
    
    async function getOneContentByID(req, res) {
        const content = await getByIDContent(req.params.id);
        res.send(content);
    }
    
    async function getListContentMultiple(_req, res) {
        const content = await findAllContent();
        res.send(content);
    }
    
    async function deleteContent(req, res) {
        const content = await deleteByIDContent(req);
        res.send(content);
    }
    
      