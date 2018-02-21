import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-hw-63.firebaseio.com/'
});

export default instance;