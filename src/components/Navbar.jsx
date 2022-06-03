import { ReactElement, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useErrorHandler } from 'react-error-boundary';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';

/**
 * React function component. Renders navbar.
 *
 * @returns {ReactElement} - page navbar component.
 */
function Navbar() {
  const { currentUser, logoutUser } = useAuth();
  const { userData, clearUserData } = useUser();
  const navigate = useNavigate();
  const handleError = useErrorHandler();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const screenBiggerThan450px = useMediaQuery('(min-width:450px)');

  /**
   * Handle open user menu.
   *
   * @param {object} event - click event.
   */
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  /**
   * Handle close user menu.
   */
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  /**
   * Handle logout.
   */
  const handleLogOut = async () => {
    try {
      await logoutUser();
      clearUserData();
      navigate('/login');
    } catch (er) {
      handleError(er.message);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              variant="text"
              component={RouterLink}
              to="/"
              sx={{
                color: 'white',
                fontFamily: 'Righteous',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                textTransform: 'none',
              }}
            >
              Climbing Partners
            </Button>
          </Box>

          {currentUser && (
            <Box sx={{ flexGrow: 0 }}>
              {screenBiggerThan450px && (
                <Tooltip title="Home" sx={{ marginRight: 1 }}>
                  <IconButton aria-label="home" component={RouterLink} to="/">
                    <HomeIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Chat" sx={{ marginRight: 2 }}>
                <IconButton aria-label="chat" component={RouterLink} to="/chat">
                  <MessageIcon sx={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userData?.profile?.name} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem component={RouterLink} to="/profile" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    handleLogOut();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
