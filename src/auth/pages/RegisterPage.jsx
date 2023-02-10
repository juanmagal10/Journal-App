import { Grid, Typography, TextField, Button, Link,Alert } from "@mui/material"
import { Link as RouterLink} from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { logout } from "../../store/auth";


const formData = {
  email: 'juanma@gmail.com',
  password: '123456',
  displayName:'Juan Manuel Galvan'
}

const formValidations = {
  email:[(value)=>value.includes('@'),'El correo debe tener una @'],
  password:[(value)=>value.length>=6,'El password debe de tener mas de seis caracteres'],
  displayName:[(value)=>value.length>=1,'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const dispatch= useDispatch()

  const [formSubmited, setFormSubmited] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);

  const isChekingAuthentication = useMemo(() => status === 'cheking', [status]);

  const { email, password, onInputChange, formState, displayName, isFormValid, passwordValid, emailValid, displayNameValid } = useForm(formData, formValidations);

  

  const onSubmit = (event) => {
    event.preventDefault()
    setFormSubmited(true)
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
    <AuthLayout title='Crear Cuenta'>

      <h1>Form Valid {isFormValid?'valido' :'incorrecto'}</h1>

      <form onSubmit={onSubmit}
      className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label='Nombre Completo'
                type='text'
                placeholder='Nombre Completo'
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmited}
                helperText={displayNameValid}
              />
            </Grid>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label='Correo'
                type='email'
                placeholder='correo@google.com'
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmited}
                helperText={emailValid}
              />
            </Grid>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField
                label='Contraseña'
                type='password'
                placeholder='Contraseña'
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmited}
                helperText={passwordValid}
              />
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2, mt:1 }}>
            <Grid
              item
              xs={12}
              display={!!errorMessage?'':'none'}
            >
              <Alert severity='error'>{errorMessage} </Alert>
            </Grid>
            
              <Grid item xs={12}>
                <Button
                  disabled={isChekingAuthentication}
                  variant='contained'
                  fullWidth
                  type="submit"
                >
                  Crear Cuenta
                </Button>
              </Grid>
            </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr:1}}>Ya tienes cuenta?</Typography>
              <Link component={RouterLink} color='inherit' to='/auth/login'>
                  Ingresar
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
   
  )
}








