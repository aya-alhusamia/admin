import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { Box, Fade, Menu, MenuItem, Stack, Typography } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { useTheme } from '@mui/material';

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Navbar({ open, handleDrawerOpen, setMode }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [personAnchorEl, setPersonAnchorEl] = React.useState(null);
  const { i18n } = useTranslation();
  const [currentTime, setCurrentTime] = React.useState(new Date());

  const open1 = Boolean(anchorEl);
  const openPersonMenu = Boolean(personAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handlePersonClick = (event) => {
    setPersonAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPersonAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    return `${date.toLocaleDateString(undefined, options)} at ${date.toLocaleTimeString(undefined, timeOptions)}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const userRole = localStorage.getItem('userRole');

  return (
    <AppBar position="fixed" open={open} >
      <Toolbar>
        {userRole !== 'employee' && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Box flexGrow={1} />
        <Stack direction={'row'}>
          {theme.palette.mode === 'light' ? (
            <IconButton color='inherit' onClick={() => {
              localStorage.setItem("currentMode", theme.palette.mode === 'dark' ? 'light' : 'dark');
              setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
            }}>
              <LightModeOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton color='inherit' onClick={() => {
              localStorage.setItem("currentMode", theme.palette.mode === 'dark' ? 'light' : 'dark');
              setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light');
            }}>
              <DarkModeOutlinedIcon />
            </IconButton>
          )}
          <IconButton color='inherit'>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          <IconButton color='inherit' onClick={handlePersonClick}>
            <PersonOutlineOutlinedIcon />
          </IconButton>
          <Menu
            id="person-menu"
            anchorEl={personAnchorEl}
            open={openPersonMenu}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
          <IconButton color='inherit'
            aria-controls={open1 ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open1 ? 'true' : undefined}
            onClick={handleClick}>
            <LanguageOutlinedIcon />
          </IconButton>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open1}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={() => changeLanguage('ar')}>Ar</MenuItem>
            <MenuItem onClick={() => changeLanguage('en')}>En</MenuItem>
          </Menu>
          <Stack direction='row' alignItems='center'>
            <IconButton color='inherit'>
              <AccessTimeOutlinedIcon />
            </IconButton>
            <Typography variant='body2' color='inherit'>
              {formatDateTime(currentTime)}
            </Typography>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
