import { Container, TextField, Button} from "@mui/material";

export default function UploadPhotoForm() {
    return (
        <Container component="main" maxWidth="xs">
            <form id="uploadPhoto">
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nombre"
                    name="photoName"
                    autoFocus
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    id="description"
                    label="Descripción"
                    name="description"
                    autoFocus
                    multiline
                />
                <Button
                    variant="contained"
                    component="label"
                    margin="normal"
                >
                    Seleccionar imagen
                    <input
                        type="file"
                        hidden
                    />
                </Button>
                <Button
                    margin="normal"
                    type="submit"
                    fullWidth
                    variant="contained"
                >
                    Enviar
                </Button>
            </form>
        </Container>
    )
}