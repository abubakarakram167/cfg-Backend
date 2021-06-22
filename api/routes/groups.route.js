/* Authorization 1 */

const model = require('../models');
const express = require('express');
const GroupCtrl = require('../controllers/groups.controller');

const router = express.Router();
module.exports = router;

router.post('/', GroupCtrl.createGroup);
 router.get('/list/:searchString/:type', GroupCtrl.getGroupsList);
 router.put('/', GroupCtrl.updateGroup);
 router.post('/assign', GroupCtrl.assignGroupToUser)
// router.delete('/:id', GroupCtrl.deleteGroup);

