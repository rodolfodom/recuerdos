import axios from 'axios';


export default async function postUser(user) {
    try {
        const response = await axios.post('http://localhost:3000/user/signup', user);
        return response.data;
    } catch (error) {
        throw error;
    }
}