/* Controller 1 */

const preferenceService = require('../dal/preferences.dao');
module.exports = {
          createOnePreference,
          getOnePreferenceByID,
          getListPreferenceMultiple,
          deletePreference,
          editPreferenceById
      
      };
      async function insertPreference(preferenceData) {
        const preference = { ...preferenceData };
        const preferenceDb = await preferenceService.add(preference);
        const preferenceRaw = await preferenceDb.get({ plain: true });
    
        return preferenceRaw;
    }
    async function getByIDPreference(preferenceData) {
        const preference = { ...preferenceData };
        const preferenceDb = await preferenceService.getOneByID(preference);
        const preferenceRaw = await preferenceDb.get({ plain: true });
    
        return preferenceRaw;
    }
    
    async function findAllPreference() {
        const preferenceDb = await preferenceService.getList();
        return preferenceDb;
    }
    
    async function deleteByIDPreference(preferenceData) {
        const preference = { ...preferenceData };
        const preferenceDb = await preferenceService.deleteOne(preference);
        return preferenceDb;
    }



    async function editPreferenceById(req, res){
        const {id} = req.params;
        const {option_value , option_description} = req.body;
        console.log(id + option_value + option_description)
        let preferencedb =  await preferenceService.updateOne(
            { 
                option_value,
                option_description
            }, {
            where: {
              id
            }
          });
        res.send({message:"preferencedb" , res:preferencedb});
    }

    async function createOnePreference(req, res) {
        const preference = await insertPreference(req.body);
        res.send(preference);
    }
    
    async function getOnePreferenceByID(req, res) {
        let id = Number(req.params.id);
        if(isNaN(id)) { return res.send({message:"Invalid preference id."}); } 
        const preference = await getByIDPreference(id);
        res.send(preference);
    }
    
    async function getListPreferenceMultiple(_req, res) {
        const preference = await findAllPreference();
        res.send(preference);
    }
    
    async function deletePreference(req, res) {
        const preference = await deleteByIDPreference(req);
        res.send(preference);
    }
    
      