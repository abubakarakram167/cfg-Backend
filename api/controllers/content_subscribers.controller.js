/* Controller 1 */

const content_subscriberService = require('../dal/content_subscribers.dao');
const contentService = require('../dal/content.dao');
const { sendEmail } = require('../helpers/mail.helper');
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
    const reqObject = req.body;
    if(reqObject.content_id === undefined || isNaN(reqObject.content_id) ){
        return res.status(400).send({mesage:"Invalid content"})
    }
    const {user} = req;
    // checking content type
    let content = await contentService.getOneByID({where:{id:reqObject.content_id}})

    if(content.type !== "event" || content.event_type !== "face-to-face"){
        return res.status(400).send({mesage:"Invalid event."})
    }
    

    reqObject.subscription_date = new Date()
    reqObject.user_id = user.id
    sendEmail(
        user.email,
        `Thanks for registering to event '${content.title}'`,
        `<h1>Hey ${user.first_name} ${user.last_name}! </h1><br><h2>Thank you , You have been registered for the event  " <strong>${content.title}</strong> "</h2><br>Click the link to join the meeting  <a href="${content.join_link}">Join Meeting</a>`
    );
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
