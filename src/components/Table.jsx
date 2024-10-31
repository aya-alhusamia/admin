import React from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography, useTheme, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Table = ({ title = "Default Title", rows = [], columns = [] }) => {
  const theme = useTheme();
  return (
    <Card    sx={{ my: "20px" , mx:"5px" }}>
      <CardActionArea>
        <CardContent>
          <Typography
            sx={{
              color: theme.palette.primary.light,
              fontWeight: "bold",
            }}
            variant="h5"
          >
            {title}
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            autoHeight
            auttoWidth 
            
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Table;
