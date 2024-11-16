const CalendarEntry = require('../context/database').CalendarEntry;
const Exercise = require('../context/database').Exercise;

module.exports = {
    getExercisesForDate: async (date) => {
        try {
            const dateObject = new Date(date);
            const exercises = await CalendarEntry.findAll({
                where: {
                    date: dateObject
                },
                include: {
                    model: Exercise,  
                    as: 'exercise',   
                },
            });
            return exercises;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },
    createCalendarEntry: async (data) => {
        try {
            const newEntry = await CalendarEntry.create(data);
            return newEntry;
        } catch (error) {
            console.error(error);
            throw new Error('Error creating calendar entry');
        }
    },
    createExercise: async (data) => {
        try {
            const newEntry = await Exercise.create(data);
            return newEntry;
        } catch (error) {
            console.error(error);
            throw new Error('Error creating calendar entry');
        }
    },
    updateCalendarEntryStatus: async (exerciseId, newstatus) => {
        try {
            console.log(exerciseId);
            console.log(newstatus);
            const [updated] = await CalendarEntry.update(
                { status: newstatus }, 
                { where: { id: exerciseId } }
            );
            if (!updated) throw new Error('Entry not found or no update performed');
            return updated;
        } catch (error) {
            console.error(error);
            throw new Error('Error updating calendar entry status');
        }
    },
    getAllExercises: async () => {
        try {
            const exercises = await Exercise.findAll();
            return exercises;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching exercises');
        }
    }

};