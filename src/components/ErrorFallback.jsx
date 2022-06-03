import { ReactElement } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

/**
 * React functional component. Renders error fallback.
 *
 * @returns {ReactElement} - error fallback component.
 */
function ErrorFallback() {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
      maxWidth="sm"
    >
      <Typography variant="h4" color="initial">
        Ooops, something went wrong...
      </Typography>
      <Typography variant="body1" color="initial">
        Please try again in a short while by refreshing the site.
      </Typography>
    </Container>
  );
}

export default ErrorFallback;
