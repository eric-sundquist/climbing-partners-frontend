import Box from '@mui/material/Box';
import { Outlet, Link as RouterLink } from 'react-router-dom';

import Link from '@mui/material/Link';
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
        <Link component={RouterLink} to="/privacy-policy">
          Privacy Policy
        </Link>
      </Box>
    </Box>
  );
}

export default Layout;
