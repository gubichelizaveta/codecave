const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');


router.get('/ByDate', exerciseController.getExercisesForDate);
router.post('/create', exerciseController.createCalendarEntry);
router.post('/createExercise', exerciseController.createExercise);
router.put('/updateStatus', exerciseController.updateCalendarEntryStatus);
router.get('/all', exerciseController.getAllExercises);

module.exports = router;