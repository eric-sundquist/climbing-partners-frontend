import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Invites from '../components/Invites';
import Partners from '../components/Partners';
import PartnerAds from '../components/PartnerAds';
import { useUser } from '../contexts/UserContext';

function Dashboard() {
  const { userData } = useUser();
  return (
    <Container component="main" maxWidth="xl">
      <Typography sx={{ margin: 2, textAlign: 'center' }} component="h1" variant="h3">
        {userData.profile.name
          ? `Welcome ${userData.profile.name}!`
          : 'Welcome, please update your profile!'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <PartnerAds />
        </Grid>
        <Grid item xs={4}>
          <Invites />
          <Partners />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
