import { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useUser } from '../contexts/UserContext';
import Disciplines from './Disciplines';

/**
 * React function component. Renders user profile.
 *
 * @param {object} props - Props object for component.
 * @param {boolean} props.isEditing - is the profile in edit mode.
 * @param {Function} props.toggleEdit - function for toggling edit mode.
 * @returns {ReactElement} - profile component.
 */
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
      <Typography data-testid="name" component="h1" variant="h3">
        {name || 'Please update your profile'}
      </Typography>
      <Box maxWidth="sm">
        <Typography data-testid="description" variant="body1" marginTop={5} gutterBottom>
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
