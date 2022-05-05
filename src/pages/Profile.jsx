import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import Disciplines from '../components/Disciplines';

function Profile() {
  const { userData, updateUserProfile } = useUser();
  const [name, setName] = useState(userData.profile.name);
  const [description, setDescription] = useState(userData.profile.description);
  const [disciplines, setDisciplines] = useState(userData.profile.disciplines);
  // const [disciplines, setDisciplines] = useState([
  //   {
  //     discipline: 'Sport',
  //     grade: '5b',
  //   },
  //   {
  //     discipline: 'Trad',
  //     grade: '7b',
  //   },
  //   {
  //     discipline: 'Bouldering',
  //     grade: '8A',
  //   },
  // ]);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    toggleEdit();
    updateUserProfile({ name, description, disciplines });
  };

  const updateDisciplinesState = (newDiscipline, newGrade) => {
    setDisciplines([
      {
        discipline: newDiscipline,
        grade: newGrade,
      },
    ]);
    // setDisciplines((prevDisciplines) =>
    //   prevDisciplines.push({
    //     discipline: newDiscipline,
    //     grade: newGrade,
    //   })
    // );
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
            <Typography component="h4" variant="h6">
              Disciplines
            </Typography>
            {/* <Disciplines
              disciplines={disciplines}
              updateDisciplinesState={updateDisciplinesState}
              isEditable={isEditing}
            /> */}
            <Button sx={{ marginTop: 2 }} variant="contained" type="submit">
              Save profile
            </Button>
          </Box>
        ) : (
          <>
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
            {/* <Disciplines
              disciplines={disciplines}
              updateDisciplinesState={updateDisciplinesState}
              isEditable={isEditing}
            /> */}
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
