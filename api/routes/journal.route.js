const express = require('express');
const asyncHandler = require('express-async-handler');
const journalCtrl = require('../controllers/journal.controller');

const router = express.Router();
module.exports = router;

router.post('/', asyncHandler(journalCtrl.addJournal));
router.get('/', asyncHandler(journalCtrl.getJournals));
router.put('/:id', asyncHandler(journalCtrl.updateJournal));
router.delete('/:id', asyncHandler(journalCtrl.deleteJournal));
