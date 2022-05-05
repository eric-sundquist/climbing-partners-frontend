import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useRef } from 'react';
import { useUser } from '../contexts/UserContext';
import Disciplines from './Disciplines';

function EditProfileContent({ isEditing, toggleEdit }) {
  const { userData, updateUserProfile } = useUser();
  const { name, description, disciplines } = userData.profile;

  const nameRef = useRef();
  const descriptionRef = useRef();
  const [updatedDisciplines, setUpdatedDisciplines] = useState(disciplines);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUserProfile({
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      disciplines: updatedDisciplines,
    });
    toggleEdit();
  };

  const addDiscipline = (newDiscipline, newGrade) => {
    setUpdatedDisciplines((prev) => {
      const newDis = {
        discipline: newDiscipline,
        grade: newGrade,
      };
      return [...prev, newDis];
    });
  };

  const removeDiscipline = (index) => {
    setUpdatedDisciplines((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 60, height: 60 }} />

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          required
          id="name"
          label="Name"
          name="name"
          defaultValue={name}
          inputRef={nameRef}
          autoFocus
          margin="normal"
        />
        <TextField
          fullWidth
          name="description"
          label="Description"
          id="description"
          defaultValue={description}
          inputRef={descriptionRef}
          multiline
          minRows={4}
          margin="normal"
        />
        <Typography component="h4" variant="h6">
          Disciplines
        </Typography>
        <Disciplines
          disciplines={updatedDisciplines}
          addDiscipline={addDiscipline}
          removeDiscipline={removeDiscipline}
          isEditing={isEditing}
        />
        <Button sx={{ marginTop: 2 }} variant="contained" type="submit">
          Save profile
        </Button>
      </Box>
    </Box>
  );
}

export default EditProfileContent;
