/* Controller 1 */

const sessionService = require('../dal/sessions.dao');
module.exports = {
          createOneSession,
          getOneSessionByID,
          getListSessionMultiple,
          deleteSession,
      
      };
      async function insertSession(sessionData) {
        const session = { ...sessionData };
        const sessionDb = await sessionService.add(session);
        const sessionRaw = await sessionDb.get({ plain: true });
    
        return sessionRaw;
    }
    async function getByIDSession(sessionData) {
        const session = { ...sessionData };
        const sessionDb = await sessionService.getOneByID(session);
        const sessionRaw = await sessionDb.get({ plain: true });
    
        return sessionRaw;
    }
    
    async function findAllSession() {
        const sessionDb = await sessionService.getList();
        return sessionDb;
    }
    
    async function deleteByIDSession(sessionData) {
        const session = { ...sessionData };
        const sessionDb = await sessionService.deleteOne(session);
        return sessionDb;
    }
    async function createOneSession(req, res) {
        const session = await insertSession(req.body);
        res.send(session);
    }
    
    async function getOneSessionByID(req, res) {
        const session = await getByIDSession(req.params.id);
        res.send(session);
    }
    
    async function getListSessionMultiple(_req, res) {
        const session = await findAllSession();
        res.send(session);
    }
    
    async function deleteSession(req, res) {
        const session = await deleteByIDSession(req);
        res.send(session);
    }
    
      