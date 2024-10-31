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
import { instructors } from '../../assets/assets'

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
  { field: 'username', headerName: t('username') , align: 'center', headerAlign: 'center', flex: 1 },
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

const Instructors = () =>
{
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [ currentInstructors, setCurrentInstructors ] = useState( null );
  const [ selectedImage, setSelectedImage ] = useState( null );
  const theme = useTheme();
  const { t } = useTranslation(); 
    
  const handleAdd = () => {
    setEditMode(false);
    setCurrentInstructors (null);
    reset();
    setSelectedImage(null);
    setOpen(true);
    };
  const handleEdit = (instructor) => {
    setEditMode(true);
    setCurrentInstructors(instructor);
    setSelectedImage(instructor.pic);
    setValue('gender', instructor.gender);
    setValue('username', instructor.username);
    setValue('email', instructor.email);
    setValue('phoneNumber', instructor.phoneNumber);
    setValue('firstName', instructor.firstName);
    setValue('lastName', instructor.lastName);
    setValue('status', instructor.status);
    setOpen(true);
    };
const handleDelete = (id) => {
    // Logic to delete the instructor
    console.log(`Deleting instructor with id: ${id}`);
    };
  

    const handleClose = () => {
    setOpen(false);
    reset();
    };
    
    const onSubmit = (data) => {
    if (editMode) {
      // Logic to update the instructor
      console.log('Updating instructor', data);
    } else {
      // Logic to add a new instructor
      console.log('Adding new instructor', data);
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
          <Header title={ "instructors" } />
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
          rows={instructors}
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
          {editMode ? t('updateInstructors')  : t('createNewInstructors') }
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
                <Stack direction="row" spacing={3}>
                <TextField
                    label={t('firstName')}
                    {...register('firstName')}
                    defaultValue={currentInstructors?.firstName || ''}
                />
                <TextField
                    label={t('lastName')}
                    {...register('lastName')}
                    defaultValue={currentInstructors?.lastName || ''}
                />
                <TextField
                    label={t('username')}
                    {...register('username')}
                    defaultValue={currentInstructors?.username || ''}
                />
                </Stack>

                {/* Email Phone */}
                <Stack direction="row" spacing={2}>
                <TextField
                    label={t('email')}
                    {...register('email')}
                    defaultValue={currentInstructors?.email || ''}
                />
                <TextField
                    label={t('phoneNumber')}
                    {...register('phoneNumber')}
                    defaultValue={currentInstructors?.phoneNumber || ''}
                />
                </Stack>
                
                {/* Gender and Status */}
                <Stack direction="row" spacing={2}>
                <FormControl variant="filled" sx={{ flex: 1 }}>
                    <InputLabel>{t('gender')}</InputLabel>
                    <Select
                    {...register('gender')}
                    defaultValue={currentInstructors?.gender || ''}
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
                    defaultValue={currentInstructors?.status || ''}
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

export default Instructors
