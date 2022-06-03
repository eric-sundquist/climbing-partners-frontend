import { ReactElement } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Invites from '../components/Invites';
import Sessions from '../components/Sessions';
import PartnerAds from '../components/PartnerAds';
import { useUser } from '../contexts/UserContext';

/**
 * React functional component. Renders the dashboard page.
 *
 * @returns {ReactElement} - dashboard component.
 */
function Dashboard() {
  const { userData } = useUser();
  return (
    <Container component="main" maxWidth="md">
      <Typography sx={{ margin: 2, textAlign: 'center' }} component="h2" variant="h4">
        {userData.profile.name
          ? `Welcome ${userData.profile.name}!`
          : 'Welcome, please update your profile!'}
      </Typography>
      <Stack spacing={3}>
        <Invites />
        <PartnerAds />
        <Sessions />
      </Stack>
    </Container>
  );
}

export default Dashboard;
