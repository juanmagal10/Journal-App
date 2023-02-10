import { Grid, CircularProgress } from "@mui/material"

export const CheckingAuth = () => {
  return (
     <Grid
      container
      spacing={0}
      direccion='column'
      alignItems='center'
      justifyContent='center'
      sx={{minHeight:'100vh', backgroundColor: 'primary.main',padding: 4}}
    >

      <Grid container
        sx={{
            direction:'row',
            justifyContent:'center'
        }}
          >
              <CircularProgress color='warning'>
                  
              </CircularProgress>
        </Grid>
     </Grid>
  )
}


