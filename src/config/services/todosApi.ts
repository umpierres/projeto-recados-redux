import axios from 'axios';
import 'dotenv/config';

const serviceAPI = axios.create({
  baseURL: `${process.env.REACT.APP_API_URL}`,
});

export default serviceAPI;
