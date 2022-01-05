const express = require('express');
const asyncHandler = require('express-async-handler');
const zoomCtrl = require('../controllers/zoom.controller');

const router = express.Router();
module.exports = router;

router.get('/test', asyncHandler(zoomCtrl.testZoomMeeting));


