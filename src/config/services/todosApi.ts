import axios from 'axios';

const serviceAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default serviceAPI;
