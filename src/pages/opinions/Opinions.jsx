import React, { useState } from "react";
import { useForm } from 'react-hook-form'; 
 import { useTranslation } from 'react-i18next';

//Components
import Table from '../../components/Table'
import Header from '../../components/Header'

//Material
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, ButtonGroup, Stack, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel, Typography, Rating  } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

// Images + Data
import { opinions } from '../../assets/assets'

const columns = (handleEdit, handleDelete , t) => [
  {
    field: 'pic',
    headerName: t('image') ,
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    renderCell: (params) => (
      <Box
        component="img"
        src={params.value}  
        alt="profile"
        sx={{
          width: 40, 
          height: 40, 
          borderRadius: '50%',
          objectFit: 'cover', 
        }}
      />
    ),
  },
  { field: 'firstName', headerName: t('firstName') , align: 'center', headerAlign: 'center', flex: 1 },
  { field: 'lastName', headerName: t('lastName') , align: 'center', headerAlign: 'center', flex: 1 },
  { field: 'opinion', headerName:t('opinion') , align: 'center', headerAlign: 'center', flex: 1 },
  {
    field: 'rating',
    headerName: t('rating') ,
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    renderCell: (params) => (
      <Rating value={params.value} readOnly max={5} precision={0.5} />  
    ),
  },
    {
    field: 'status',
    headerName: t('status') ,
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    renderCell: (params) => (
      <Typography
        sx={{
          color: params.value === 1 ? 'green' : 'red',
          fontWeight: 'bold',
          margin: 1
        }}
      >
        {params.value === 1 ? t('active')  :t('inactive') }
      </Typography>
    ),
  },
  {
    field: 'actions',
    headerName: t('actions'),
    align: 'center',
    headerAlign: 'center',
    width: 150,
    renderCell: (params) => (
      <Stack direction={'row'} sx={{ gap: 1 }}>
        <Button variant="contained" color="primary" sx={{ flex: 1, my: '5px' }} onClick={() => handleEdit(params.row)}>{t('edit')} </Button>
        <Button variant="contained" color="error" sx={{ flex: 1, my: '5px' }} onClick={() => handleDelete(params.row.id)}>{t('delete')}</Button>
      </Stack>
    ),
  },
];


function Opinions ()
{
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [ currentOpinion, setCurrentOpinion ] = useState( null );
  const theme = useTheme();
  const { t } = useTranslation();

 

  const handleEdit = (opinion) => {
    setEditMode(true);
    setCurrentOpinion(opinion);
    setValue('status', opinion.status);
    setOpen(true);
  };

  const handleDelete = (id) => {
    // Logic to delete the Opinions
    console.log(`Deleting Opinions with id: ${id}`);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };
 

  
 const onSubmit = (data) => {
    console.log('Updating Opinion Status:', { ...currentOpinion, status: data.status });
    handleClose();
  };

  
  return (
    <Box>
      <Header title={ "opinions" } />
       <Box sx={{ mx: "auto" }}>
        
        <DataGrid
          checkboxSelection
          slots={{
            toolbar: GridToolbar,
          }}
          rows={opinions}
          columns={columns(handleEdit, handleDelete, t)}
        />
      </Box>
       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
           {t('edit')} 
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl variant="filled">
              <InputLabel id="status-label">{t('status')}</InputLabel>
              <Select
                labelId="status-label"
                {...register('status')}
                defaultValue={currentOpinion?.status || ""}
                onChange={(e) => setValue('status', e.target.value)}
              >
                <MenuItem value={1}>{t('active')}</MenuItem>
                <MenuItem value={2}>{t('inactive')}</MenuItem>
              </Select>
            </FormControl>
            <DialogActions>
              <Button type='submit' sx={{ textTransform: 'capitalize' }} variant='contained'>
                {t('edit')}
              </Button>
              <Button onClick={ handleClose } variant='outlined'>{t('cancel')}</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
   </Box>
  )
}

export default Opinions