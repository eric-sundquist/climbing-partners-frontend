import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import Disciplines from '../components/Disciplines';

function OtherUserProfile() {
  const { owner } = useLocation().state;
  const { name, disciplines, description } = owner.profile;

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 60, height: 60 }} alt={name} />
      <Typography component="h1" variant="h3">
        {name || 'Your name'}
      </Typography>
      <Box maxWidth="sm">
        <Typography variant="body1" marginTop={5} gutterBottom>
          {description || 'Tell us some more about yourself. Whats your favorite climbs?'}
        </Typography>
      </Box>
      {disciplines.length > 0 ? (
        <Typography variant="h5" marginTop={5}>
          Disciplines
        </Typography>
      ) : (
        ''
      )}
      <Disciplines disciplines={disciplines} />
      <Button
        component={RouterLink}
        to="/chat"
        state={{ withUserId: owner.id }}
        variant="contained"
        color="primary"
      >
        Send Message
      </Button>
    </Box>
  );
}

export default OtherUserProfile;
