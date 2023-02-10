import {Grid, Typography} from '@mui/material'

export const AuthLayout = ({children, title=''}) => {
  return (
    <Grid
      
      container
      spacing={0}
      direccion='column'
      alignItems='center'
      justifyContent='center'
      sx={{minHeight:'100vh', backgroundColor: 'primary.main',padding: 4}}
    >

      <Grid item
        className="box-shadow"
        xs={6}
        sx={{
            width: {sm: 1000},
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2
        }}
      >

        <Typography
          variant="h5"
          sx={{ mb: 1 }}
          
        >
          {title}
              </Typography>
              {children}
        </Grid>
    </Grid>
  )
}


