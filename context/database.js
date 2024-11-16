const Sequelize = require("sequelize");
const config = require("../config.json");

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  config.db.options
);


const Exercise = require('../models/Exercise')(Sequelize, sequelize);
const CalendarEntry = require('../models/CalendarEntry')(Sequelize, sequelize);

Exercise.hasMany(CalendarEntry, { foreignKey: 'exerciseId', as: 'entries' });
CalendarEntry.belongsTo(Exercise, { foreignKey: 'exerciseId', as: 'exercise' });

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("Error syncing database:", err));


module.exports = {
  Exercise: Exercise,
  CalendarEntry: CalendarEntry,
  sequelize,
  Sequelize,
};
