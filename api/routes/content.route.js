/* Authorization 1 */
const asyncHandler = require('express-async-handler');

const express = require('express');
const ContentCtrl = require('../controllers/content.controller');

const router = express.Router();
module.exports = router;

router.post('/:type', asyncHandler(ContentCtrl.createOneContent));
router.put('/:type', asyncHandler(ContentCtrl.editContent));
router.get('/list/:type', asyncHandler(ContentCtrl.getListContentMultiple));
router.get('/list/content/:type/:id', asyncHandler(ContentCtrl.getSingleSessionCompleteDetails));
router.get('/dayTools', ContentCtrl.getDayTools);
router.get('/:id', ContentCtrl.getOneContentByID);
router.get('/search/:string', ContentCtrl.search);

router.delete('/:id', ContentCtrl.deleteContent);
