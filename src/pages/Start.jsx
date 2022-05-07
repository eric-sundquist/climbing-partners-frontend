import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';

function Start() {
  return (
    <Container component="main" maxWidth="md">
      <h1>Landing Page</h1>
      <p>Welcome! Bla bla bla</p>
      <Box marginBottom={2}>
        <Button variant="contained" component={RouterLink} to="/login">
          Log in
        </Button>
      </Box>
      <Box>
        <Button variant="contained" component={RouterLink} to="/signup">
          Sign up
        </Button>
      </Box>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci tempora labore, iste quis
        maxime aspernatur atque. Beatae optio incidunt facere quasi nam quae vitae, necessitatibus
        ipsum eos alias illum dolor? Suscipit iste corrupti impedit quisquam! Molestiae animi eius
        dolore suscipit.
      </p>
    </Container>
  );
}

export default Start;
