import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function Profile({ profileData }) {
  const { name, description, disciplines } = profileData;
  return (
    <Container component="main" maxWidth="m">
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
          {name}
        </Typography>
        <Typography variant="body1" marginTop={5} gutterBottom>
          {description}
        </Typography>
        <Typography variant="h5" marginTop={5}>
          Disciplines
        </Typography>
        <p>Disciplines Length: {disciplines.length}</p>
      </Box>
    </Container>
  );
}

export default Profile;
