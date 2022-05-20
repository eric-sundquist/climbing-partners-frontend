import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Invites from '../components/Invites';
import Sessions from '../components/Sessions';
import PartnerAds from '../components/PartnerAds';
import { useUser } from '../contexts/UserContext';

function Dashboard() {
  const { userData } = useUser();
  return (
    <Container component="main" maxWidth="xl">
      <Typography sx={{ margin: 2, textAlign: 'center' }} component="h2" variant="h3">
        {userData.profile.name
          ? `Welcome ${userData.profile.name}!`
          : 'Welcome, please update your profile!'}
      </Typography>
      <Grid container spacing={2} mt={2} mb={4}>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <Invites />
            <PartnerAds />
            <Sessions />
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
