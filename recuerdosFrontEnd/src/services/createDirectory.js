import axios from "axios";


export default async function createDirectory(directory, authToken) {
    console.log(directory);
    console.log(authToken)
    const response = await axios.post('http://localhost:3000/directory/create', directory, {
        headers: {
            Authorization: `${authToken}`,
        }
    });
    return response.data;
}