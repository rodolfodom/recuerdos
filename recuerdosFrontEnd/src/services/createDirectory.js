import axios from "axios";
import CONSTANTS from "../CONSTANTS.js";

export default async function createDirectory(directory, authToken) {
    console.log(directory);
    console.log(authToken)
    const response = await axios.post(`${CONSTANTS.API_URL}/directory/create`, directory, {
        headers: {
            Authorization: `${authToken}`,
        }
    });
    return response.data;
}