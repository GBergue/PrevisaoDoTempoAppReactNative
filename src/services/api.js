import axios from 'axios';

//https://api.hgbrasil.com/weather?key=8af1d641&lat=-23.682&lon=-46.875

export const key = '8af1d641';

const api = axios.create({
    baseURL: 'https://api.hgbrasil.com'
});

export default api;