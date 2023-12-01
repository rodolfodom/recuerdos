import axios from "axios";
import CONSTANTS from "../CONSTANTS.js";

export default async function getDirectoryElements(id, authToken) {
    const response = await axios.get(`${CONSTANTS.API_URL}/directory/getChildren/${id}`,{
        headers: {
            Authorization: `${authToken}`,
        }
    });
    return response.data;
}