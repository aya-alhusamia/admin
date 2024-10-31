// ThemeLayout.js
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getDesignTokens } from './theme';

function ThemeLayout ( { children, mode } )
{
    const theme = React.useMemo( () => createTheme( getDesignTokens( mode ) ), [ mode ] );

    return (
        <ThemeProvider theme={ theme }>
            { children }
        </ThemeProvider>
    );
}

export default ThemeLayout;
