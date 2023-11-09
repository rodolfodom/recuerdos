import { Container, TextField } from "@mui/material";

export default function UserPage(){
    return(
        <Container component="form" maxWidth="xs">
            <TextField label="Nombre" />
            <input type="file" name="image" id="imageinput" />
        </Container>
    )
}