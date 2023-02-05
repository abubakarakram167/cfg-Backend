/* Controller 1 */

const notificationSubscriptionService = require('../dal/notification_subscriptions.dao');

module.exports = {
    createOneSubscription,
    getOneSubscriptionById,
    updateSubscription,
    deleteSubscriptionByID,
    getListSubscriptionMultiple,
};

async function updateSubscription(req, res) {
    const id = req.params.id;
    const updatedData = req.body;
    const sub = await notificationSubscriptionService.update(updatedData, { where: { id } });
    if (sub[0] == 1) {
        res.send({ message: "subscription updated successfully" });
    } else {
        res.send({ message: "subscription updation failure" });
    }
}


async function getOneSubscriptionById(req, res) {
    const subscription = await getByIDsubscription(req.params.id);
    res.send(subscription);
}
//Task Processor functions
async function insertSubscription(subscriptionData) {
    const subscription = { ...subscriptionData };
    const subscriptionDb = await notificationSubscriptionService.add(subscription);
    const subscriptionRaw = await subscriptionDb.get({ plain: true });
    return subscriptionRaw;
}

async function getListSubscriptionMultiple(_req, res) {
    const result = await findAllSubscription();
    res.send(result);
}

async function findAllSubscription() {
    const questionDb = await questionService.getList();
    return questionDb;
}

async function deleteSubscriptionByID(req, res) {
    const id = req.params.id;
    const subscription = await notificationSubscriptionService.deleteOne({id});
    //console.log(subscription);
    if (subscription == 1) {
        res.send({ message: "subscription deleted successfully" });
    } else {
        res.send({ message: "subscription deletion failure" });
    }
}

//Req Processor functions
async function createOneSubscription(req, res) {

    const requestObject = req.body;
    console.log(requestObject)

    requestObject.user_id = req.user.id;

    // console.log(requestObject);
    const subscription = await insertSubscription(requestObject);
    res.send(subscription);
}