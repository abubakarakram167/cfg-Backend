const express = require('express');
const catCtrl = require('../controllers/categories.controller');

const router = express.Router();
module.exports = router;

router.post('/', catCtrl.createOne);
router.get('/list', catCtrl.getListMultiple);
router.get('/:id', catCtrl.getOneByID);
router.delete('/:id', catCtrl.deleteCategory);
