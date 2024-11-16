import axios from 'axios';


const API_BASE_URL = 'http://localhost:4000/exercise';

export const getExercises = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении списка упражнений:', error);
    throw error;
  }
};

export const getExercisesByDate = async (date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ByDate`, {
      params: { date },
    });
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении упражнений на определенную дату ${date}:`, error);
    throw error;
  }
};


export const addExerciseToDate = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, payload);
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении упражнения на определенную дату:', error);
    throw error;
  }
};

export const updateExerciseStatus = async (exerciseId, newstatus) => {
    try {
      
      const response = await axios.put(`${API_BASE_URL}/updateStatus/`, {
        exerciseId,
        newstatus
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при изменении статуса упражнения:', error);
      throw error; 
    }
  };