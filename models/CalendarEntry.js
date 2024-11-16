module.exports = (Sequelize, sequelize) => {
    return sequelize.define('CalendarEntry', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },  
    date: {
        type: Sequelize.DATE,
        allowNull:false
    },
    status: {
        type: Sequelize.STRING,
        allowNull:false
    },
    goal: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
});
}
