import axios from "axios";
import CONSTANTS from "../CONSTANTS";

export default async function uploadImage(formData, authToken) {

    try {
        const response = await axios.post(`${CONSTANTS.API_URL}/image/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': authToken,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error en la petición:', error);
        // Manejar el error según tus necesidades
    }

}