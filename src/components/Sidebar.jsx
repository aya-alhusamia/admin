import { useLocation, useNavigate } from 'react-router-dom';
 import { useTranslation } from 'react-i18next';

// material ui style 
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled, useTheme } from '@mui/material/styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { BarChartOutlined, CalendarTodayOutlined, HelpOutlineOutlined, MapOutlined, PersonOutline, PieChartOutline, TimelineOutlined } from '@mui/icons-material';
import { Avatar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
} );

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
} ) );

 

const array1 = [
  // {
  //   id:1,
  //   name: 'home',
  //   icon: <HomeOutlinedIcon/>,
  //   route:'/home'
  // },
  {
    id:2,
    name: 'opinions',
    icon: <PsychologyAltOutlinedIcon/>,
    route:'/opinions'
  },
]

const array2 = [
  {
    id:1,
    name: 'courses',
    icon: <MenuBookOutlinedIcon/>,
    route:'/courses'
  },
   {
    id:2,
    name: 'categories',
    icon: <ListAltOutlinedIcon/>,
    route:'/categories'
  },
]
const array3 = [
  {
    id:1,
    name: 'admin',
    icon: <ManageAccountsOutlinedIcon/>,
    route:'/admin'
  },
   {
    id:2,
    name: 'instructors',
    icon: <PeopleOutlineOutlinedIcon/>,
    route:'/instructors'
  },
  {
    id:3,
    name: 'trainees',
    icon: <PeopleOutlineOutlinedIcon/>,
    route:'/trainees'
  },
 
]

 


function Sidebar ( {open, handleDrawerClose } )
{
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate()
  let location = useLocation()
  
  return (
          <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
      </DrawerHeader>
      <Divider />
      <Avatar sx={{mx:"auto", width: open ? 88: 44 , height: open ? 88: 44, my:1 , border:" 2px solid grey" , transition: "0.25s"}} alt="Travis Howard" src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2022-10/girl-names-that-start-with-c-zz-221027-768b76.jpg" />
      <Typography  align='center'  sx={{ fontSize:open ? 17: 0 , transition: "0.25s"}} > Aya Alhusamia </Typography>
      <Typography  align='center'  sx={{ fontSize:open ? 15: 0 , transition: "0.25s" , color:theme.palette.info.main }}> Admin </Typography>
        <Divider />
        <List>
          {array1.map((item ) => (
            <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={ () =>
                {
                  navigate(item.route)
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  bgcolor: location.pathname === item.route ? theme.palette.mode === "dark"? grey[800] :grey[300] :null ,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 {item.icon}
                </ListItemIcon>
                <ListItemText primary={t(item.name)} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {array2.map((item ) => (
            <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={ () =>
                {
                  navigate(item.route)
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  bgcolor: location.pathname === item.route ? theme.palette.mode === "dark"? grey[800] :grey[300] :null ,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 {item.icon}
                </ListItemIcon>
                <ListItemText primary={t(item.name)} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      <Divider />
      <List>
          {array3.map((item ) => (
            <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={ () =>
                {
                  navigate(item.route)
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  bgcolor: location.pathname === item.route ?theme.palette.mode === "dark"? grey[800] :grey[300] :null ,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 {item.icon}
                </ListItemIcon>
                <ListItemText primary={t(item.name)} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      <Divider />
      </Drawer>
  )
}

export default Sidebar