import React, { useState, useEffect } from 'react';
import { getExercisesByDate, updateExerciseStatus, getExercises, addExerciseToDate } from './services/api'; 
import './App.css';

const App = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [dateExercises, setDateExercises] = useState([]);
  const [exerciseStatuses, setExerciseStatuses] = useState({}); 
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [goal, setGoal] = useState('');
  const [status, setStatus] = useState('');
  const [allExercises, setAllExercises] = useState([]); 
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const exercises = await getExercises();
        setAllExercises(exercises);
      } catch (error) {
        console.error('Ошибка при получении всех упражнений:', error);
      }
    };

    fetchExercises();
  }, []);

 
  const handleDateChange = async (event) => {
    const date = event.target.value;
    setSelectedDate(date);

    if (date) {
      try {
        const exercisesForDate = await getExercisesByDate(date);
        setDateExercises(exercisesForDate);
      } catch (error) {
        console.error(`Ошибка при получении упражнений на ${date}:`, error);
      }
    } else {
      setDateExercises([]);
    }
  };


  const handleStatusChange = async (exerciseId, newStatus) => {
    try {
      await updateExerciseStatus(exerciseId, newStatus);
      setDateExercises((prevExercises) =>
        prevExercises.map((exercise) =>
          exercise.id === exerciseId ? { ...exercise, status: newStatus } : exercise
        )
      );
      setExerciseStatuses((prevStatuses) => {
        const newStatuses = { ...prevStatuses };
        delete newStatuses[exerciseId];
        return newStatuses;
      });
    } catch (error) {
      console.error('Ошибка при изменении статуса:', error);
    }
  };
  const handleAddExercise = async () => {
    if (!selectedExercise || !goal || !status || !selectedDate) {
      alert('Пожалуйста, выберите упражнение, цель, статус и дату.');
      return;
    }

    const newExercise = {
      exerciseId: selectedExercise,
      goal,
      status,
      date: selectedDate,
    };

    try {
      await addExerciseToDate(newExercise);
      setShowModal(false);
      const exercisesForDate = await getExercisesByDate(selectedDate);
      setDateExercises(exercisesForDate);
    } catch (error) {
      console.error('Ошибка при добавлении упражнения:', error);
    }
  };

  return (
    <div>
      <h1>Управление упражнениями</h1>

      <div>
        <label>
          Выберите дату:
          <input type="date" onChange={handleDateChange} value={selectedDate} />
        </label>
      </div>

      <h2>Упражнения на дату {selectedDate || 'не выбрано'}</h2>
      {dateExercises.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Название упражнения</th>
              <th>Цель</th>
              <th>Единица измерения</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {dateExercises.map((exerciseEntry) => (
              <tr key={exerciseEntry.id}>
                <td>{exerciseEntry.exercise.name}</td>
                <td>{exerciseEntry.goal}</td>
                <td>{exerciseEntry.exercise.unit}</td>
                <td>{exerciseEntry.status}</td>
                <td>
                  <input
                    type="text"
                    value={exerciseStatuses[exerciseEntry.id] || ''}
                    onChange={(e) => setExerciseStatuses({ ...exerciseStatuses, [exerciseEntry.id]: e.target.value })}
                    placeholder="Введите новый статус"
                  />
                  <button
                    onClick={() => {
                      const newStatus = exerciseStatuses[exerciseEntry.id] || exerciseEntry.status;
                      handleStatusChange(exerciseEntry.id, newStatus);
                    }}
                  >
                    Изменить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Нет упражнений на эту дату.</p>
      )}

      <button className='addButton' onClick={() => setShowModal(true)}>Добавить упражнение</button>

      {showModal && (
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
                      {exercise.name}
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
      )}
    </div>
  );
};

export default App;
