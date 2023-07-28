import axios from 'axios';

const serviceAPI = axios.create({
  baseURL: `${process.env.API_URL}`,
});

export default serviceAPI;
