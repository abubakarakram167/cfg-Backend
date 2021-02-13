/* Authorization 1 */

const express = require('express');
const PreferenceCtrl = require('../controllers/preferences.controller');

const router = express.Router();
module.exports = router;

// router.post('/', PreferenceCtrl.createOnePreference);
router.get('/list', PreferenceCtrl.getListPreferenceMultiple);
// router.get('/:id', PreferenceCtrl.getOnePreferenceByID);
// router.delete('/:id', PreferenceCtrl.deletePreference);
