import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"
import { Google } from "@mui/icons-material"
import { Link as RouterLink} from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";

const formData = {
  email: 'fernando@google.com',
  password: '123456'
};

export const LoginPage = () => {

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector(state => state.auth);
  

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(()=>status==='checking',[status]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({email, password}))
    
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())

  }

  

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit}
        aria-label='submit-form'
      className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label='Correo'
                type='email'
                placeholder='correo@google.com'
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label='Contraseña'
                type='password'
                placeholder='Contraseña'
                fullWidth
                name="password"
                inputProps={{
                'data-testid':'password'
              }}
                value={password}
                onChange={onInputChange}
              
            />
            
          </Grid>

          <Grid
            container
            display={!!errorMessage ? '' : 'none'}
            sx={{mt:1}}
          >
               <Grid
              item
              xs={12}  
            >
              <Alert severity='error'>{errorMessage} </Alert>
            </Grid>

            </Grid>
          
            <Grid container spacing={2} sx={{ mb: 2, mt:1 }}>
              <Grid item xs={12} sm={6}>
                <Button variant='contained' fullWidth type="submit" disabled={isAuthenticating}>
                  Login
                </Button>
            </Grid>
            
              <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                fullWidth
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
                aria-label='google-btn'
              >
                  <Google />
                  <Typography sx={{ml:1}}>
                    Google
                  </Typography>
                </Button>
              </Grid>
 
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={RouterLink} color='inherit' to='/auth/register'>
                  Crear cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>


 

      

   
  )
}


