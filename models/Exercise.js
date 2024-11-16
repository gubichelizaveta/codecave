module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Exercise', {   
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    unit: {
        type: Sequelize.STRING,
        allowNull: false
    },
});
}

