import axios from 'axios';

const api = axios.create({
  baseURL: '/api/chat-support/chat',
});

export const chat = async (message) => {
  const response = await api.post('', { message });
  return response.data.message;
};