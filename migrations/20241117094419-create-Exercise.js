'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Добавить начальные значения в таблицу Exercise
    await queryInterface.bulkInsert('Exercises', [
      {
        name: 'бег',
        unit: 'км',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'планка',
        unit: 'сек',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'приседания',
        unit: 'раз',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'прыжки со скакалкой',
        unit: 'раз',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'отжимания',
        unit: 'раз',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Exercises');
  }
};
