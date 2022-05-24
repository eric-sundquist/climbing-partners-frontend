import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <Navbar />

      <Box
        sx={{
          paddingBottom: 6,
        }}
      >
        <Outlet />
      </Box>
      <Box
        sx={{
          height: '3rem',
          width: '100%',
          position: 'absolute',
          bottom: '0',
          borderTop: '1px solid gray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <b>Footer</b>
        <b>Privacy Policy</b>
        <b>Another</b>
      </Box>
    </Box>
  );
}

export default Layout;
