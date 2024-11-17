import React, { useState, useEffect } from 'react';
import { getExercisesByDate, updateExerciseStatus, getExercises, addExerciseToDate } from './services/api';
import './App.css';
import ExerciseTable from './components/ExerciseTable';
import ExerciseModal from './components/ExerciseModal';

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
        <ExerciseTable 
          dateExercises={dateExercises} 
          exerciseStatuses={exerciseStatuses} 
          handleStatusChange={handleStatusChange} 
          setExerciseStatuses={setExerciseStatuses} 
        />
      ) : (
        <p>Нет упражнений на эту дату.</p>
      )}

      <button className='addButton' onClick={() => setShowModal(true)}>Добавить упражнение</button>

      {showModal && (
        <ExerciseModal 
          showModal={showModal} 
          setShowModal={setShowModal} 
          selectedExercise={selectedExercise} 
          setSelectedExercise={setSelectedExercise} 
          goal={goal} 
          setGoal={setGoal} 
          status={status} 
          setStatus={setStatus} 
          allExercises={allExercises} 
          handleAddExercise={handleAddExercise} 
        />
      )}
    </div>
  );
};

export default App;
