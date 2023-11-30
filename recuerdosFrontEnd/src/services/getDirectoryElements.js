import axios from "axios";

export default async function getDirectoryElements(id, authToken) {
    const response = await axios.get(`http://localhost:3000/directory/getChildren/${id}`,{
        headers: {
            Authorization: `${authToken}`,
        }
    });
    return response.data;
}