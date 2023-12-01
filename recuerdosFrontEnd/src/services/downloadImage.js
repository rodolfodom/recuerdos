import axios from "axios";
export default function downloadImage(imageId, authToken) {
    axios.get(`http://localhost:3000/image/download/${imageId}`, {
        headers: {
            'Authorization': authToken,
        },
        responseType: 'blob',
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        // El nombre con el que se descarga el archivo
        link.setAttribute('download', `${imageId}.zip`);
        document.body.appendChild(link);
        link.click();
    })
}