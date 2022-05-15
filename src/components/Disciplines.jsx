import { useState } from 'react';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Discipline from './Discipline';

function Disciplines({ isEditing, disciplines, addDiscipline, removeDiscipline }) {
  const [open, setOpen] = useState(false);
  const [newGrade, setNewGrade] = useState('');
  const [newDiscipline, setNewDiscipline] = useState('');
  const [error, setError] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = () => {
    if (newGrade && newDiscipline) {
      addDiscipline(newDiscipline, newGrade);
      handleClose();
      setError('');
    } else {
      setError('Please choose a discipline and grade.');
    }
  };

  const disciplineTypes = ['Sport', 'Bouldering', 'Trad'];
  const grades = ['5b', '5c', '6a', '6b', '6c', '7a', '7b', '7c', '8a', '8b', '8c'];

  return (
    <Box sx={{ margin: 2, display: 'flex', gap: 2 }}>
      {disciplines.map((dis, index) => (
        <Discipline
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          index={index}
          discipline={dis.discipline}
          grade={dis.grade}
          isEditing={isEditing}
          removeDiscipline={removeDiscipline}
        />
      ))}

      {isEditing && (
        <IconButton onClick={handleOpen} aria-label="add" size="large">
          <AddCircleIcon fontSize="inherit" />
        </IconButton>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 360,
            bgcolor: 'background.paper',
            border: '1px solid #000',
            borderRadius: 3,
            boxShadow: 24,
            p: 2,
          }}
        >
          {error && (
            <Alert sx={{ mb: 2 }} severity="error">
              {error}
            </Alert>
          )}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 130 }}>
              <InputLabel id="discipline-select-label">Discipline</InputLabel>
              <Select
                labelId="discipline-select-label"
                id="discipline-select-label"
                value={newDiscipline}
                onChange={(e) => setNewDiscipline(e.target.value)}
                label="Discipline"
              >
                {disciplineTypes.map((dis) => (
                  <MenuItem key={dis} value={dis}>
                    {dis}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="grade-select-label">Grade</InputLabel>
              <Select
                labelId="grade-select-label"
                id="grade-select-label"
                onChange={(e) => setNewGrade(e.target.value)}
                value={newGrade}
                label="Grade"
              >
                {grades.map((grade) => (
                  <MenuItem key={grade} value={grade}>
                    {grade}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button onClick={handleAdd} variant="contained">
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default Disciplines;
