import axios from 'axios';

const serviceAPI = axios.create({
  baseURL: 'http://localhost:8080',
});

export default serviceAPI;
