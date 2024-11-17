import React from 'react';

const ExerciseModal = ({
  showModal, setShowModal, selectedExercise, setSelectedExercise, goal, setGoal, status, setStatus, allExercises, handleAddExercise
}) => (
  <div className="modal">
    <div className="modal-content">
      <h2>Добавить упражнение</h2>
      <div>
        <label>
          Выберите упражнение:
          <select value={selectedExercise} onChange={(e) => setSelectedExercise(e.target.value)}>
            <option value="">Выберите упражнение</option>
            {allExercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name} ({exercise.unit})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Цель:
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Введите цель"
          />
        </label>
      </div>

      <div>
        <label>
          Статус:
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Введите статус"
          />
        </label>
      </div>

      <button className='modal-button' onClick={handleAddExercise}>Добавить</button>
      <button className='modal-button' onClick={() => setShowModal(false)}>Закрыть</button>
    </div>
  </div>
);

export default ExerciseModal;
