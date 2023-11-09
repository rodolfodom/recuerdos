import axios from "axios";

export default async function logInUser(user) {
    try {
        const response = await axios.post('http://localhost:3000/user/login', user);
        return response.data;
    } catch (error) {
        throw error;
    }
}
