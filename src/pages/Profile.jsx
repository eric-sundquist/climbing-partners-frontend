import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Profile({ uid, profileData, fetchEditUser }) {
  const { currentUser } = useAuth();
  const [name, setName] = useState(profileData.name);
  const [description, setDescription] = useState(profileData.description);
  const [disciplines, setDisciplines] = useState(profileData.disciplines);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    toggleEdit();
    fetchEditUser(`/users/${currentUser.uid}/profile`, { name, description, disciplines });
  };

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
        {isEditing ? (
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              required
              id="name"
              label="Name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoFocus
              margin="normal"
            />
            <TextField
              fullWidth
              name="description"
              label="Description"
              id="description"
              value={description}
              multiline
              minRows={4}
              onChange={(event) => setDescription(event.target.value)}
              margin="normal"
            />
            <Button variant="contained" type="submit">
              Save profile
            </Button>
          </Box>
        ) : (
          <>
            {' '}
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
            <p>Disciplines Length: {disciplines.length}</p>
            <Button variant="contained" onClick={toggleEdit}>
              Edit profile
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}

export default Profile;
