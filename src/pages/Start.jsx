import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';

function Start() {
  return (
    <Container component="main" maxWidth="md">
      <h1>Landing Page</h1>
      <p>Welcome!</p>
      <p>
        Climbing Partners is an applikation that helps you find partners to climb with whereever you
        go! Create an account and start using the application now.
      </p>
      <Box marginBottom={2}>
        <Button variant="contained" component={RouterLink} to="/signup">
          Sign up
        </Button>
      </Box>
      <Box>
        <Button variant="contained" component={RouterLink} to="/login">
          Log in
        </Button>
      </Box>
    </Container>
  );
}

export default Start;
