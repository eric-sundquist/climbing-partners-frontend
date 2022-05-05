import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useUser } from '../contexts/UserContext';
import Disciplines from './Disciplines';

function ProfileContent({ isEditing, toggleEdit }) {
  const { userData } = useUser();
  const { name, description, disciplines } = userData.profile;

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
        {name}
      </Typography>
      <Box maxWidth="sm">
        <Typography variant="body1" marginTop={5} gutterBottom>
          {description}
        </Typography>
      </Box>
      <Typography variant="h5" marginTop={5}>
        Disciplines
      </Typography>
      <Disciplines disciplines={disciplines} isEditing={isEditing} />
      <Button
        variant="contained"
        onClick={() => {
          toggleEdit();
        }}
      >
        Edit profile
      </Button>
    </Box>
  );
}

export default ProfileContent;
