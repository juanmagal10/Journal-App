import { Grid, Typography, Button, TextField, IconButton } from "@mui/material";
import { SaveOutlined,UploadOutlined, DeleteOutline } from "@mui/icons-material";
import {ImageGallery} from '../components'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from '../../hooks/useForm'
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote, startSaveNote, startUploadingFiles, startDeletingNote } from "../../store/journal";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);

    const { body, title, onInputChange, date, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));

    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved])

    const onSavedNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({ target }) => {
        
        if (target.files === 0) return;
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }



  return (
      <Grid
          className='animate__animated animate__fadeIn animate__faster'
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ mb: 1 }}
      >
          <Grid item>
              <Typography fontSize={39}
              fontWeight='light'>
                 {dateString}
              </Typography>
              
              
          </Grid>
          <Grid item>
              
              <IconButton
                  color='primary'
                  disabled={isSaving}
                  onClick={()=>fileInputRef.current.click()}
              >
                  <UploadOutlined />
              </IconButton>

               <input
                  type="file"
                  multiple
                  onChange={onFileInputChange}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
              />
              

              <Button
                  color='primary'
                  sx={{ padding: 2 }}
                  onClick={onSavedNote}
                  disabled={isSaving}
              >
                  <SaveOutlined sx={{fontSize:30, mr:1}}/>
                      Guardar
             </Button>
          </Grid>
          
          <Grid container>
              <TextField
                  type='text'
                  variant="filled"
                  fullWidth
                  placeholder="Ingrese un titulo"
                  label='titulo'
                  sx={{ border: 'none', mb: 1 }}
                  name='title'
                  value={title}
                  onChange={onInputChange}
              />
              <TextField
                  type='text'
                  variant="filled"
                  fullWidth
                  multiline
                  placeholder="Que sucedio en el dia de hoy?"
                  minRows={5}
                  name='body'
                  value={body}
                  onChange={onInputChange}
              />
          </Grid>

          <Grid
              container
              justifyContent='end'
          >
              <Button
                  onClick={onDelete}
                  sx={{ mt: 2 }}
                  color='error'
              >
                  <DeleteOutline/>
              </Button>
          </Grid>
          
          <ImageGallery images={note.imageUrls}></ImageGallery>
    </Grid>
  )
}
