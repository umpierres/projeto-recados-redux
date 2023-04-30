import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useNavigate } from 'react-router-dom';
import ThemeSwitch from './ThemeSwitch';
import { ThemeContext } from '../ThemeContext';

import { loggedInRoutes } from '../routes/routes';
import { setRememberedUser } from '../store/modules/loggedUserSlice';
import { useAppDispatch } from '../store/hooks';

interface ResponsiveAppBarProps {
  mode: 'loggedOut' | 'loggedIn';
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({ mode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (url: string) => {
    setAnchorElNav(null);
    navigate(url);
  };

  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MeetingRoomIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Bem-Vindo
          </Typography>
          {mode === 'loggedIn' && (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenu('/')}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {loggedInRoutes.map((page) => (
                  <MenuItem key={page.url} onClick={() => handleCloseNavMenu(page.url)}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          <MeetingRoomIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Bem-vindo
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {mode === 'loggedIn'
              && loggedInRoutes.map((page) => (
                <Button key={page.url} onClick={() => handleCloseNavMenu(page.url)} sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.label}
                </Button>
              ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Trocar tema">
              <IconButton sx={{ p: 0 }}>
                <ThemeSwitch checked={isDarkMode} onChange={toggleDarkMode} />
              </IconButton>
            </Tooltip>
            {mode === 'loggedIn' && (
              <Tooltip title="Sair">
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => {
                    const cleanUser = {
                      email: '',
                      password: '',
                      tasks: [],
                      remember: false,
                    };
                    dispatch(setRememberedUser(cleanUser));

                    navigate('/');
                  }}
                >
                  <NoMeetingRoomIcon sx={{ color: '#fff' }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
