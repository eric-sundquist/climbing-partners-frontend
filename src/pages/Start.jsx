import { ReactElement } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';

/**
 * React functional component. Renders the start page.
 *
 * @returns {ReactElement} - the start page component.
 */
function Start() {
  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h4" component="h1" marginTop={2}>
        Welcome!
      </Typography>
      <Typography variant="body1" color="initial">
        Climbing Partners is an applikation that helps you find partners to climb with whereever you
        go! Create an account and start using the application now.
      </Typography>
      <Box marginTop={2}>
        <Button sx={{ mr: 2 }} variant="contained" component={RouterLink} to="/signup">
          Sign up
        </Button>

        <Button variant="contained" component={RouterLink} to="/login">
          Log in
        </Button>
      </Box>
    </Container>
  );
}

export default Start;
