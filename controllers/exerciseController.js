const ExerciseService = require('../services/exerciseService');

module.exports = {
    getExercisesForDate: async (req, res) => {
        try {
            const { date } = req.query;
            if (!date) {
                return res.status(400).json({ message: 'Дата не указана' });
            }
            const exercises = await ExerciseService.getExercisesForDate(date);
            res.status(200).json(exercises);
        } catch (err) {
            res.status(500).json({ error: 'Error fetching exercises for this date' });
        }
    },
    createCalendarEntry: async (req, res) => {
        try {
            const { date, status, goal, exerciseId } = req.body;
            const newEntry = await ExerciseService.createCalendarEntry({ date, status, goal, exerciseId });
            res.status(201).json(newEntry);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating calendar entry' });
        }
    },
    createExercise: async (req, res) => {
        try {
            const { name, unit} = req.body;
            const newEntry = await ExerciseService.createExercise({ name, unit});
            res.status(201).json(newEntry);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating exercise' });
        }
    },
    updateCalendarEntryStatus: async (req, res) => {
        try {
            const { exerciseId, newstatus } = req.body;
            console.log(exerciseId);
            console.log(newstatus);
            if (!exerciseId || !newstatus) {
                return res.status(400).send('Exercise ID and new status are required');
            }        
            else {
                await ExerciseService.updateCalendarEntryStatus(exerciseId, newstatus);
            } 
            res.status(200).json({ message: 'Status updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating calendar status' });
        }
    },
    getAllExercises: async (req, res) => {
        try {
            const exercises = await ExerciseService.getAllExercises();
            res.status(200).json(exercises);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error' });
        }
    },
};
