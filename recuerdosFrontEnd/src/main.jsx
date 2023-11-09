import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import WelcomePage from './components/welcomePage';
import LogInPage from './components/logInPage';
import SignUpPage from './components/signUpPage';
import UserPage from './components/userPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ConfirmationPage from './components/confirmationPage';


const theme = createTheme({
  palette: {
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#449DD1',
    }
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage/>
  },
  {
    path: "/login",
    element: <LogInPage/>
  },
  {
    path: "/signUp",
    element: <SignUpPage/>
  },
  {
    path: "/user",
    element: <UserPage/>
  },
  {
    path: "/user/confirmation/:token",
    element: <ConfirmationPage/>
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router}/>
    </ThemeProvider>
  </React.Fragment>,
)
