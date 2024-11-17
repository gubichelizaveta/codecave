import React from 'react';

const ExerciseTable = ({ dateExercises, exerciseStatuses, handleStatusChange, setExerciseStatuses }) => (
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
);

export default ExerciseTable;
