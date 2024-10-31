import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getDesignTokens } from './theme';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'; 

const DrawerHeader = styled( 'div' )( ( { theme } ) => ( {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing( 0, 1 ),
  ...theme.mixins.toolbar,
} ) );

function App ()
{
  const [ open, setOpen ] = React.useState( false );
  const [ mode, setMode ] = React.useState( localStorage.getItem( "currentMode" ) ? localStorage.getItem( "currentMode" ) : "light" );
  const location = useLocation();
  const authToken = localStorage.getItem( 'authToken' );

  const handleDrawerOpen = () =>
  {
    setOpen( true );
  };

  const handleDrawerClose = () =>
  {
    setOpen( false );
  };

  const theme = React.useMemo( () => createTheme( getDesignTokens( mode ) ), [ mode ] );

  const userRole = localStorage.getItem( 'userRole' );

 

  return (
    <ThemeProvider theme={ theme }>
      <Box sx={ { display: 'flex' } }>
        <CssBaseline />
          <Navbar open={ open } handleDrawerOpen={ handleDrawerOpen } setMode={ setMode } />
          <Sidebar open={ open } handleDrawerClose={ handleDrawerClose } />
        <Box component="main" sx={ { flexGrow: 1, p: 3 } }>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
