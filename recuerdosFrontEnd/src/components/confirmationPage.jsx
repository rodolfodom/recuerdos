import { CircularProgress, Container, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CONSTANTS from "../CONSTANTS";


export default function ConfirmationPage() {
    const { token } = useParams();
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${CONSTANTS.API_URL}/user/confirmation/${token}`);
                console.log(response.data);
                setSuccess(response.data.success);
            } catch (error) {
                setSuccess(false);
            }
        })();
    }, []);

    if(success === null){   
        return(
            <Container component="main" maxWidth="xs">
                <CircularProgress/>
            </Container>
        )
    }else if(success === true){
        return(
            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5">
                    ¡Su cuenta ha sido confirmada!
                </Typography>
            </Container>
        )
    }else if(success === false){
        return(
            <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5">
                    ¡No se ha podido confirmar su cuenta!
                </Typography>
            </Container>
        )
    }
}