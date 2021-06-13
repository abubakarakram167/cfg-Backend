/* Authorization 1 */

const model = require('../models');
const express = require('express');
const path = require('path')
const multer = require('multer');
const MediaCtrl = require('../controllers/media.controller');


var storage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, path.join(__dirname, '../../static'))
        },
        filename: function (req, file, cb) {
                cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
        }
})

const fileFilter = (req, file, cb) => {
        if (
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpeg' ||
                file.mimetype === 'video/mp4'||
                file.mimetype === 'video/mkv' ||
                file.mimetype === 'application/msword' 
        ) {
                cb(null, true);
        } else {
                cb(null, false);
        }
};

var upload = multer({ storage: storage , fileFilter: fileFilter });


const router = express.Router();
module.exports = router;

router.post('/',  upload.array('media', 4), MediaCtrl.createOneMedia);
router.get('/list', MediaCtrl.getListMediaMultiple);
router.get('/:id', MediaCtrl.getOneMediaByID);
router.put('/:id', MediaCtrl.editMedia);
router.delete('/:id', MediaCtrl.deleteMedia);

