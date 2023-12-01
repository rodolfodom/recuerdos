import axios from 'axios';
import CONSTANTS from '../CONSTANTS.js';

export default async function postUser(user) {
    try {
        const response = await axios.post(`${CONSTANTS.API_URL}/user/signup`, user);
        return response.data;
    } catch (error) {
        throw error;
    }
}