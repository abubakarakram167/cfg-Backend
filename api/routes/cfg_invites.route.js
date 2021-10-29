const express = require('express');
const asyncHandler = require('express-async-handler');
const inviteCtrl = require('../controllers/cfg_invites.controller');

const router = express.Router();
module.exports = router;

router.post('/', asyncHandler(inviteCtrl.addInvite));
router.get('/', asyncHandler(inviteCtrl.getInvites));
router.put('/:id', asyncHandler(inviteCtrl.updateInvite));
router.delete('/:id', asyncHandler(inviteCtrl.deleteInvite));
