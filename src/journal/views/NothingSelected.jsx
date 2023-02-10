import { Grid, Typography } from "@mui/material";
import { StarOutlined } from "@mui/icons-material";

export const NothingSelected = () => {
  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{minHeight:'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius:3}}
      >
          <Grid item xs={12}>
              <StarOutlined sx={{ fontSize: 100, color: 'white' }}></StarOutlined>
          </Grid>
          <Grid item xs={12}>
              <Typography color='white' variant='h5'>Selecciona o crea una nota</Typography>
            </Grid>
        </Grid>
  )
}

