// lib/api.js
import axios from 'axios';
const api = axios.create({
  baseURL: '/api/ai_completion/gpt_3.5_turbo',
});

const chat = async (message, access_token, auth_token) => {
  console.log(message)
  const response = await api.post('', { message, access_token, auth_token });
  return response.data.message;
};

module.exports = chat;