/* Authorization 1 */

const express = require('express');
const model = require('../models');
const ContentCtrl = require('../controllers/content.controller');

const router = express.Router();
module.exports = router;

router.post('/:type', ContentCtrl.createOneContent);
router.get('/list/:type', ContentCtrl.getListContentMultiple);
router.get('/:id', ContentCtrl.getOneContentByID);
router.delete('/:id', ContentCtrl.deleteContent);
