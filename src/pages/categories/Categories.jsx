import React, { useState } from "react";
import { useForm } from 'react-hook-form'; 
import { useTranslation } from 'react-i18next';
 
// Components
import Table from '../../components/Table'
import Header from '../../components/Header'

// Material
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, ButtonGroup, Stack, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ColorLensIcon from '@mui/icons-material/ColorLens';

// Images + Data
import { category } from '../../assets/assets'

const columns = (handleEdit, handleDelete, t) => [
  {
    field: 'pic',
    headerName: t('image'),
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
  { field: 'nameAr', headerName: t('nameAr'), align: 'center', headerAlign: 'center', flex: 1 },
  { field: 'nameEn', headerName: t('nameEn'), align: 'center', headerAlign: 'center', flex: 1 },
  {
    field: 'color',
    headerName: t('color'),
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    renderCell: (params) => (
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          backgroundColor: params.value,
          border: '1px solid #ddd',
          marginLeft: '40%',
          marginTop:'5px'
        }}
      />
    ),
  },
  { field: 'descAr', headerName: t('descAr'), align: 'center', headerAlign: 'center', flex: 1 },
  { field: 'descEn', headerName: t('descEn'), align: 'center', headerAlign: 'center', flex: 1 },
  {
    field: 'status',
    headerName: t('status'),
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
        {params.value === 1 ? t('active') : t('inactive')}
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
        <Button variant="contained" color="primary" sx={{ flex: 1, my: '5px' }} onClick={() => handleEdit(params.row)}>{t('edit')}</Button>
        <Button variant="contained" color="error" sx={{ flex: 1, my: '5px' }} onClick={() => handleDelete(params.row.id)}>{t('delete')}</Button>
      </Stack>
    ),
  },
];

const Categories = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategories, setCurrentCategories] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const theme = useTheme();
  const { t } = useTranslation();
    
  const handleAdd = () => {
    setEditMode(false);
    setCurrentCategories(null);
    reset();
    setSelectedImage(null);
    setSelectedColor("#000000");
    setOpen(true);
  };

  const handleEdit = (category) => {
    setEditMode(true);
    setCurrentCategories(category);
    setSelectedImage(category.pic);
    setSelectedColor(category.color);
    setValue('nameAr', category.nameAr);
    setValue('nameEn', category.nameEn);
    setValue('color', category.color);
    setValue('descAr', category.descAr);
    setValue('descEn', category.descEn);
    setValue('status', category.status);
    setOpen(true);
  };
  
  const handleDelete = (id) => {
    console.log(`Deleting Category with id: ${id}`);
  };
  
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    data.color = selectedColor; // Assign selected color to form data
    if (editMode) {
      console.log('Updating Category', data);
    } else {
      console.log('Adding new Category', data);
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

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    setValue('color', e.target.value);
  };

  return (
    <Box>
      <Header title={"categories"} />
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
          rows={category}
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
          {editMode ? t('updateCategory') : t('createNewCategory')}
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
                defaultValue={currentCategories?.nameAr || ''}
              />
              <TextField
                label={t('nameEn')}
                {...register('nameEn')}
                defaultValue={currentCategories?.nameEn || ''}
              />
            </Stack>

            {/* Description Fields */}
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('descAr')}
                {...register('descAr')}
                defaultValue={currentCategories?.descAr || ''}
              />
              <TextField
                label={t('descEn')}
                {...register('descEn')}
                defaultValue={currentCategories?.descEn || ''}
              />
            </Stack>

            {/* Color Picker */}
            <FormControl sx={{ mt: 2 }}>
              {/* <InputLabel>{t('color')}</InputLabel> */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  type="color"
                  value={selectedColor}
                  onChange={handleColorChange}
                  sx={{ width: 50, height: 50, border: 'none', padding: 0 }}
                />
                <IconButton size="large" sx={{ ml: 2, color: selectedColor }}>
                  <ColorLensIcon />
                </IconButton>
              </Box>
            </FormControl>

            {/* Status Field */}
            <FormControl variant="filled" sx={{ flex: 1 }}>
              <InputLabel>{t('status')}</InputLabel>
              <Select
                {...register('status')}
                defaultValue={currentCategories?.status || 1}
              >
                <MenuItem value={1}>{t('active')}</MenuItem>
                <MenuItem value={0}>{t('inactive')}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('cancel')}</Button>
          <Button onClick={handleSubmit(onSubmit)}>{editMode ? t('update') : t('add')}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Categories;
