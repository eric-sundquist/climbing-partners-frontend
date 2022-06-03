import { ReactElement } from 'react';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * React functional component. Renders the page layout.
 *
 * @returns {ReactElement} - page layout.
 */
function Loading() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
      }}
    >
      <CircularProgress />
    </Container>
  );
}

export default Loading;
