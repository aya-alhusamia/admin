import React, { useState } from "react";
import { useForm } from 'react-hook-form'; 
import { useTranslation } from 'react-i18next';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from "dayjs";

//Components
import Table from '../../components/Table'
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
import { courses } from '../../assets/assets'

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
  { field: 'nameAr', headerName: t('nameAr') , align: 'center', headerAlign: 'center', flex: 1 },
  { field: 'nameEn', headerName: t('nameEn') , align: 'center', headerAlign: 'center', flex: 1 },
  { field: 'category', headerName:t('category') , align: 'center', headerAlign: 'center', flex: 1 },
  { field: 'descAr', headerName: t('descAr') , align: 'center', headerAlign: 'center', flex: 1 },
  { field: 'descEn', headerName: t('descEn') , align: 'center', headerAlign: 'center', flex: 1 },
  { field: 'coursesHour', headerName: t('coursesHour') , align: 'center', headerAlign: 'center', flex: 1 },
  { field: 'courseStartTime', headerName: t('courseStartTime') , align: 'center', headerAlign: 'center', flex: 1 },
  { field: 'courseEndTime', headerName: t('courseEndTime') , align: 'center', headerAlign: 'center', flex: 1 },
  { field: 'instructor', headerName: t('instructor') , align: 'center', headerAlign: 'center', flex: 1 },
  {
    field: 'courseStatus',
    headerName: t('courseStatus') ,
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
        {params.value === 1 ? t('open')  :t('close') }
      </Typography>
    ),
    },
  {
    field: 'courseType',
    headerName: t('courseType') ,
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
        {params.value === 1 ? t('online')  :t('inPerson') }
      </Typography>
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


const Courses = () =>
{
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [ currentCourse, setCurrentCourse ] = useState( null );
  const [ selectedImage, setSelectedImage ] = useState( null );
  const theme = useTheme();
  const { t } = useTranslation();
    
  const handleAdd = () => {
    setEditMode(false);
    setCurrentCourse (null);
    reset();
    setSelectedImage(null);
    setOpen(true);
    };

  const handleEdit = (course) => {
    setEditMode(true);
    setCurrentCourse(course);
    setSelectedImage(course.pic);
    setValue('nameAr', course.nameAr);
    setValue('nameEn', course.nameEn);
    setValue('category', course.category);
    setValue('descAr', course.descAr);
    setValue('descEn', course.descEn);
    setValue('coursesHour', course.coursesHour);
    setValue('courseStartTime', course.courseStartTime);
    setValue('courseEndTime', course.courseEndTime);
    setValue('instructor', course.instructor);
    setValue('courseStatus', course.courseStatus);
    setValue('courseType', course.courseType);
    setValue('status', course.status);
    setOpen(true);
  };
  
  const handleDelete = (id) => {
    // Logic to delete the Course
    console.log(`Deleting Course with id: ${id}`);
    };
  

    const handleClose = () => {
    setOpen(false);
    reset();
    };
    
    const onSubmit = (data) => {
    if (editMode) {
      // Logic to update the Course
      console.log('Updating Course', data);
    } else {
      // Logic to add a new Course
      console.log('Adding new Course', data);
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
          <Header title={ "courses" } />
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
          rows={courses}
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
          {editMode ? t('updateCourse')  : t('createNewCourse') }
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
                    label={t('nameAr')}
                    {...register('nameAr')}
                    defaultValue={currentCourse?.nameAr || ''}
                />
                <TextField
                    label={t('nameEn')}
                    {...register('nameEn')}
                    defaultValue={currentCourse?.nameEn || ''}
                />
                </Stack>

                {/* Description Fields */}
                <Stack direction="row" spacing={2}>
                <TextField
                    label={t('descAr')}
                    {...register('descAr')}
                    defaultValue={currentCourse?.descAr || ''}
                />
                <TextField
                    label={t('descEn')}
                    {...register('descEn')}
                    defaultValue={currentCourse?.descEn || ''}
                />
                </Stack>

                {/* Category and Instructor */}
                <Stack direction="row" spacing={2}>
                <TextField
                    label={t('category')}
                    {...register('category')}
                    defaultValue={currentCourse?.category || ''}
                />
                <TextField
                    label={t('instructor')}
                    {...register('instructor')}
                    defaultValue={currentCourse?.instructor || ''}
                />
                </Stack>

                {/* Course Start Time and End Time */}
                <Stack direction="row" spacing={2}>
                <FormControl sx={{ flex: 1 }} >
                
                  <LocalizationProvider dateAdapter ={AdapterDayjs}>
                    <DatePicker
                    label={t('selectStartDate')}
                   value={dayjs()}

                    renderInput={(params) => <TextField {...params} />}
                    />

                  </LocalizationProvider>          
                          </FormControl>
                          
                <FormControl sx={{ flex: 1 }}>
                   
                     <LocalizationProvider dateAdapter={ AdapterDayjs }>
                          <DatePicker
                            label={t('selectEndDate')}
                            value={dayjs()}
                            
                            renderInput={(params) => <TextField {...params} />}
                            /> 
                         </LocalizationProvider>
                   
                </FormControl>
                </Stack>

                {/* Courses Hour and Course Type */}
                <Stack direction="row" spacing={2}>
                <TextField
                    label={t('coursesHour')}
                    {...register('coursesHour')}
                    defaultValue={currentCourse?.coursesHour || ''}
                />
                <FormControl variant="filled" sx={{ flex: 1 }}>
                    <InputLabel>{t('courseType')}</InputLabel>
                    <Select
                    {...register('courseType')}
                    defaultValue={currentCourse?.courseType || ''}
                    onChange={(e) => setValue('courseType', e.target.value)}
                    >
                    <MenuItem value={1}>{t('online')}</MenuItem>
                    <MenuItem value={2}>{t('inPerson')}</MenuItem>
                    </Select>
                </FormControl>
                </Stack>

                {/* Course Status and Status */}
                <Stack direction="row" spacing={2}>
                <FormControl variant="filled" sx={{ flex: 1 }}>
                    <InputLabel>{t('courseStatus')}</InputLabel>
                    <Select
                    {...register('courseStatus')}
                    defaultValue={currentCourse?.courseStatus || ''}
                    onChange={(e) => setValue('courseStatus', e.target.value)}
                    >
                    <MenuItem value={1}>{t('open')}</MenuItem>
                    <MenuItem value={2}>{t('close')}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" sx={{ flex: 1 }}>
                    <InputLabel>{t('status')}</InputLabel>
                    <Select
                    {...register('status')}
                    defaultValue={currentCourse?.status || ''}
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

export default Courses
