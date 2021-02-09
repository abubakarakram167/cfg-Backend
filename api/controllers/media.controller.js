/* Controller 1 */

const mediaService = require('../dal/media.dao');
module.exports = {
          createOneMedia,
          getOneMediaByID,
          getListMediaMultiple,
          deleteMedia,
      
      };
      async function insertMedia(mediaData) {
        const media = { ...mediaData };
        const mediaDb = await mediaService.add(media);
        const mediaRaw = await mediaDb.get({ plain: true });
    
        return mediaRaw;
    }
    async function getByIDMedia(mediaData) {
        const media = { ...mediaData };
        const mediaDb = await mediaService.getOneByID(media);
        const mediaRaw = await mediaDb.get({ plain: true });
    
        return mediaRaw;
    }
    
    async function findAllMedia() {
        const mediaDb = await mediaService.getList();
        return mediaDb;
    }
    
    async function deleteByIDMedia(mediaData) {
        const media = { ...mediaData };
        const mediaDb = await mediaService.deleteOne(media);
        return mediaDb;
    }
    async function createOneMedia(req, res) {
        const media = await insertMedia(req.body);
        res.send(media);
    }
    
    async function getOneMediaByID(req, res) {
        const media = await getByIDMedia(req.params.id);
        res.send(media);
    }
    
    async function getListMediaMultiple(_req, res) {
        const media = await findAllMedia();
        res.send(media);
    }
    
    async function deleteMedia(req, res) {
        const media = await deleteByIDMedia(req);
        res.send(media);
    }
    
      