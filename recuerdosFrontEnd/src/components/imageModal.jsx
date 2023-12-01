import { Dialog, DialogActions, DialogContent, Button, DialogTitle, DialogContentText, TextField, Box, CircularProgress } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import uploadImage from "../services/uploadImage";
import { useState } from "react";
import { useCookies } from "react-cookie";


export default function ImageModal({ open, setOpen, currentDirectory, update }) {
    const [image, setImage] = useState(null)
    const [imageToSend, setImageToSend] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [cookies] = useCookies(['cookie-name']);
    const [loading, setLoading] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        
        setImageToSend(file);

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                // Al cargar la imagen, actualiza el estado para mostrar la miniatura
                setImage(e.target.result);
            };

            // Lee el contenido de la imagen como una URL de datos
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const extension = imageToSend.name.split('.').pop();
        const formData = new FormData();
        formData.append('name', `${name}.${extension}`);
        formData.append('description', description);
        formData.append('image', imageToSend);
        formData.append('directoryID', currentDirectory);

        //console.log("*********************** fromData ***********************");
        //console.log(formData.get('name'));
        //console.log(formData.get('description'));
        //console.log(formData.get('directoryID'));
        try {
            setLoading(true)
            const response = await uploadImage(formData, cookies.authToken);
            //console.log(response.msg);
            handleClose()
            update()
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false)
        }
    }


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Agregar un nuevo Recuerdo</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Agrega una nueva imagen a tu galería. Maten tus recuerdos actualizados.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nombre"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Descripción"
                    type="text"
                    fullWidth
                    variant="standard"
                    multiline
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                />
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{ mt: 2 }}
                >
                    Seleccionar imagen
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Button>

                {image && (
                    <Box sx={{ mt: 2 }}>
                        <img src={image} alt="Imagen seleccionada" style={{ maxWidth: '70px' }} />
                    </Box>

                )}

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleSubmit} disabled={loading}>{loading? <CircularProgress size={20}/>:'Subir'}</Button>
            </DialogActions>
        </Dialog>
    )
}