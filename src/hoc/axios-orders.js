import axios from "axios";

const instance = axios.create({
    baseURL: 'https://burger-builder-1a8c1-default-rtdb.firebaseio.com/'
});

export default instance;