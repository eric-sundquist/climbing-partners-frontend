import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function NoMatch() {
  return (
    <Container
      maxWidth="md"
      sx={{
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h3" color="initial">
        404
      </Typography>
      <Typography variant="h5" color="initial">
        Nothing to see here!
      </Typography>
      <Button component={RouterLink} to="/" variant="text" color="primary">
        Go to home page
      </Button>
    </Container>
  );
}

export default NoMatch;
