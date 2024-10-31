import React from 'react';
 import { useTranslation } from 'react-i18next';

import { Box, Typography, useTheme } from "@mui/material";


const Header = ({title, isDashboard=false}) => {
  const theme = useTheme();
  const { t  } = useTranslation();
  return (
    <Box mb={ isDashboard? 2 :        4}>
    <Typography
      sx={{
        color: theme.palette.info.light,
        fontWeight: "bold",
      }}
      variant="h5"
    >
      {t(title)}
    </Typography>
  </Box>

  
  );
}

export default Header;