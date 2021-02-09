/* Controller 1 */

const content_subscriberService = require('../dal/content_subscribers.dao');
module.exports = {
          createOneContentSubscriber,
          getOneContentSubscriberByID,
          getListContentSubscriberMultiple,
          deleteContentSubscriber,
      
      };
      async function insertContentSubscriber(content_subscriberData) {
        const content_subscriber = { ...content_subscriberData };
        const content_subscriberDb = await content_subscriberService.add(content_subscriber);
        const content_subscriberRaw = await content_subscriberDb.get({ plain: true });
    
        return content_subscriberRaw;
    }
    async function getByIDContentSubscriber(content_subscriberData) {
        const content_subscriber = { ...content_subscriberData };
        const content_subscriberDb = await content_subscriberService.getOneByID(content_subscriber);
        const content_subscriberRaw = await content_subscriberDb.get({ plain: true });
    
        return content_subscriberRaw;
    }
    
    async function findAllContentSubscriber() {
        const content_subscriberDb = await content_subscriberService.getList();
        return content_subscriberDb;
    }
    
    async function deleteByIDContentSubscriber(content_subscriberData) {
        const content_subscriber = { ...content_subscriberData };
        const content_subscriberDb = await content_subscriberService.deleteOne(content_subscriber);
        return content_subscriberDb;
    }
    async function createOneContentSubscriber(req, res) {
        const content_subscriber = await insertContentSubscriber(req.body);
        res.send(content_subscriber);
    }
    
    async function getOneContentSubscriberByID(req, res) {
        const content_subscriber = await getByIDContentSubscriber(req.params.id);
        res.send(content_subscriber);
    }
    
    async function getListContentSubscriberMultiple(_req, res) {
        const content_subscriber = await findAllContentSubscriber();
        res.send(content_subscriber);
    }
    
    async function deleteContentSubscriber(req, res) {
        const content_subscriber = await deleteByIDContentSubscriber(req);
        res.send(content_subscriber);
    }
    
      