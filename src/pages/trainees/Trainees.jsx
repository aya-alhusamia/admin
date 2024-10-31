import React, { useState } from "react";
import { useForm } from 'react-hook-form'; 
import { useTranslation } from 'react-i18next';
 

//Components
import Header from '../../components/Header'

//Material
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, ButtonGroup, Stack, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel, Typography, Rating  } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTheme } from '@mui/material/styles';

// Images + Data
import { trainees } from '../../assets/assets'

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
 { field: 'email', headerName: t('email') , align: 'center', headerAlign: 'center', flex: 1 },
  { field: 'phoneNumber', headerName:t('phoneNumber') , align: 'center', headerAlign: 'center', flex: 1 },
   
  {
    field: 'gender',
    headerName: t('gender') ,
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    renderCell: (params) => (
      <Typography
        sx={{
          fontWeight: 'bold',
          margin: 1
        }}
      >
        {params.value === 1 ? t('male')  :t('female') }
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


const Trainees = () => {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [ currentTrainees, setCurrentTrainees ] = useState( null );
  const [ selectedImage, setSelectedImage ] = useState( null );
  const theme = useTheme();
  const { t } = useTranslation(); 
    
  const handleAdd = () => {
    setEditMode(false);
    setCurrentTrainees (null);
    reset();
    setSelectedImage(null);
    setOpen(true);
    };
  const handleEdit = (trainee) => {
    setEditMode(true);
    setCurrentTrainees(trainee);
    setSelectedImage(trainee.pic);
    setValue('gender', trainee.gender);
    setValue('email', trainee.email);
    setValue('phoneNumber', trainee.phoneNumber);
    setValue('firstName', trainee.firstName);
    setValue('lastName', trainee.lastName);
    setValue('status', trainee.status);
    setOpen(true);
    };
const handleDelete = (id) => {
    // Logic to delete the trainee
    console.log(`Deleting trainee with id: ${id}`);
    };
  

    const handleClose = () => {
    setOpen(false);
    reset();
    };
    
    const onSubmit = (data) => {
    if (editMode) {
      // Logic to update the trainee
      console.log('Updating trainee', data);
    } else {
      // Logic to add a new trainee
      console.log('Adding new trainee', data);
    }
    handleClose();
    };
    
 const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));  
      setValue('pic', file);  
    }
    }; 
  return (
    <Box>
          <Header title={ "trainees" } />
        <Box sx={{ mx: "auto" }}>
        <ButtonGroup variant="contained" aria-label="button group" sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleAdd}
          >
            {t('add')}
          </Button>
        </ButtonGroup>
        <DataGrid
          checkboxSelection
          slots={{
            toolbar: GridToolbar,
          }}
          rows={trainees}
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
          {editMode ? t('updateTrainee ')  : t('createNewTrainee ') }
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
                <FormControl>
                <Button variant="contained" component="label">
                    {t('uploadImage')} 
                    <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                </Button>
                {selectedImage && (
                    <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 2,
                    }}
                    >
                    <Box
                        component="img"
                        src={selectedImage}
                        alt="Selected"
                        sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        mt: 2,
                        }}
                    />
                    </Box>
                )}
                </FormControl>

                {/* Name Fields */}
                <Stack direction="row" spacing={2}>
                <TextField
                    label={t('firstName')}
                    {...register('firstName')}
                    defaultValue={currentTrainees?.firstName || ''}
                />
                <TextField
                    label={t('lastName')}
                    {...register('lastName')}
                    defaultValue={currentTrainees?.lastName || ''}
                />
                </Stack>

                {/* Email Phone */}
                <Stack direction="row" spacing={2}>
                <TextField
                    label={t('email')}
                    {...register('email')}
                    defaultValue={currentTrainees?.email || ''}
                />
                <TextField
                    label={t('phoneNumber')}
                    {...register('phoneNumber')}
                    defaultValue={currentTrainees?.phoneNumber || ''}
                />
                </Stack>
                
                {/* Gender and Status */}
                <Stack direction="row" spacing={2}>
                <FormControl variant="filled" sx={{ flex: 1 }}>
                    <InputLabel>{t('gender')}</InputLabel>
                    <Select
                    {...register('gender')}
                    defaultValue={currentTrainees?.gender || ''}
                    onChange={(e) => setValue('gender', e.target.value)}
                    >
                    <MenuItem value={1}>{t('male')}</MenuItem>
                    <MenuItem value={2}>{t('female')}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" sx={{ flex: 1 }}>
                    <InputLabel>{t('status')}</InputLabel>
                    <Select
                    {...register('status')}
                    defaultValue={currentTrainees?.status || ''}
                    onChange={(e) => setValue('status', e.target.value)}
                    >
                    <MenuItem value={1}>{t('active')}</MenuItem>
                    <MenuItem value={2}>{t('inactive')}</MenuItem>
                    </Select>
                </FormControl>
                </Stack>

                <DialogActions>
                <Button type="submit" sx={{ textTransform: 'capitalize' }} variant="contained">
                    {editMode ? t('edit') : t('add')}
                </Button>
                <Button onClick={handleClose} variant="outlined">{t('cancel')}</Button>
                </DialogActions>
            </Box>
            </DialogContent>
      </Dialog>  
    </Box>
  )
}

export default Trainees
