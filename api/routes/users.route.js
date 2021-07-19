const express = require('express');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/users.controller');

const router = express.Router();
module.exports = router;

router.get('/list', asyncHandler(userCtrl.listUsers));
router.put('/status/:status', asyncHandler(userCtrl.updateStatus));
router.get('/group', asyncHandler(userCtrl.getUserGroup));
router.get('/groupById', asyncHandler(userCtrl.getUserGroupById));
router.get('/:id', asyncHandler(userCtrl.getOneByID));
router.delete('/', asyncHandler(userCtrl.deleteUsers));
router.post('/', asyncHandler(userCtrl.addUser));
router.put('/', asyncHandler(userCtrl.editUser));
