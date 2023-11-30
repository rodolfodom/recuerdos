import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logInUser from '../services/logInUser';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';




export default function LogInPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['authToken', 'rootDirectory']);
  
    const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const data = {
        email: event.target.email.value,
        password: event.target.password.value
    }
    try{
        const responseData = await logInUser(data);
        const {authToken, rootDirectory} = responseData;
        setCookie('authToken', authToken, {path: '/'});
        setCookie('rootDirectory', rootDirectory, {path: '/'});
        //console.log(cookies);
        setAuthenticated(true)
    }catch(error){
        console.log(error);
        setError(true)
    }finally{
        setLoading(false)
    }   
  };


  useEffect(() => {
    if(authenticated){
        navigate("/user")
    }
  }, [authenticated]);


  return (
    
      <Container component="main" maxWidth="xs">
        {error && <Alert severity="error">No se ha podido iniciar sesión</Alert>}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading? <CircularProgress size="1.5rem"/>:"Iniciar sessión"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"¿Aún no tienes una cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    
  );
}