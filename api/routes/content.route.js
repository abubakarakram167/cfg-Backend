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
router.get('/dayTools', asyncHandler(ContentCtrl.getDayTools));
router.get('/:id', asyncHandler(ContentCtrl.getOneContentByID));
router.get('/search/:string', asyncHandler(ContentCtrl.search));
router.get('/getAllTitles/:type' , asyncHandler(ContentCtrl.getAllTitles))
router.delete('/:id', asyncHandler(ContentCtrl.deleteContent));
