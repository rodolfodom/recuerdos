import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import postUser from '../services/postUser';
import { CircularProgress, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    const data = {
      firstName: event.target.firstName.value,
      fatherLastName: event.target.fatherLastName.value,
      motherLastName: event.target.motherLastName.value,
      email: event.target.email.value,
      password: event.target.password.value
    }
    try {

      await postUser(data);
      setError(false)
      setTimeout(()=>{
        navigate('/logIn')
      }, 5000)
    } catch (error) {
      setError(true)
    }finally{
      setLoading(false)
    }
  };

  return (
    
      <Container component="main" maxWidth="xs">
        {loading === false && <Alert severity={error? "error" : "success"}>{error? "No se ha podido registarr el usuario": "Se ha enviado un enlace de confirmación a su correo electrónico."}</Alert>}
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
            Registro
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="fatherLastName"
                  label="Apellido Paterno"
                  name="fatherLastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="motherLastName"
                  label="Apellido Materno"
                  name="motherLastName"
                  autoComplete="family-name"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading? <CircularProgress size='1.5rem'/> : 'Registrarse'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/logIn" variant="body2">
                  ¿Ya tienes una cuenta? Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}