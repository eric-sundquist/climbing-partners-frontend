import { ReactElement, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useUser } from '../contexts/UserContext';
import Disciplines from './Disciplines';

/**
 * React functional component. Renders form for editing profile content.
 *
 * @param {object} props - Props object for component.
 * @param {boolean} props.isEditing - is the profile in edit mode.
 * @param {Function} props.toggleEdit - function for toggling edit mode.
 * @returns {ReactElement} - edit profile form component.
 */
function EditProfileContent({ isEditing, toggleEdit }) {
  const { userData, updateUserProfile } = useUser();
  const { name, description, disciplines } = userData.profile;

  const nameRef = useRef();
  const descriptionRef = useRef();
  const [updatedDisciplines, setUpdatedDisciplines] = useState(disciplines);

  /**
   * Handles form submit.
   *
   * @param {object} event - form submit event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    updateUserProfile({
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      disciplines: updatedDisciplines,
    });
    toggleEdit();
  };

  /**
   * Adds a new discipline.
   *
   * @param {string} newDiscipline - climbing discipline.
   * @param {string} newGrade - grade for discipline.
   */
  const addDiscipline = (newDiscipline, newGrade) => {
    setUpdatedDisciplines((prev) => {
      const newDis = {
        discipline: newDiscipline,
        grade: newGrade,
      };
      return [...prev, newDis];
    });
  };

  /**
   * Removes a discipline from the profile.
   *
   * @param {number} index - index of discipline to remove.
   */
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
          id="name"
          label="Name"
          name="name"
          defaultValue={name}
          inputRef={nameRef}
          autoComplete="off"
          autoFocus
          margin="normal"
        />
        <TextField
          fullWidth
          name="description"
          label="Tell us some more about yourself and your climbing"
          id="description"
          defaultValue={description}
          inputRef={descriptionRef}
          multiline
          minRows={6}
          autoComplete="off"
          margin="normal"
        />
        <Typography component="h4" variant="h6">
          Add your disciplines and the max grade you have climbed
        </Typography>
        <Disciplines
          disciplines={updatedDisciplines}
          addDiscipline={addDiscipline}
          removeDiscipline={removeDiscipline}
          isEditing={isEditing}
        />
        <Button sx={{ marginTop: 2, marginBottom: 2 }} variant="contained" type="submit">
          Save profile
        </Button>
      </Box>
    </Box>
  );
}

export default EditProfileContent;
