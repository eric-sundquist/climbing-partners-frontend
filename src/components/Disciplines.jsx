import { useState } from 'react';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Discipline from './Discipline';

function Disciplines({ isEditable, disciplines, updateDisciplinesState }) {
  const [open, setOpen] = useState(false);
  const [newDiscipline, setNewDiscipline] = useState('');
  const [newGrade, setNewGrade] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const disciplineTypes = ['Sport', 'Bouldering', 'Trad'];
  const grades = ['6a', '7a', '8a', '9a'];

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {disciplines.map((dis) => (
        <Discipline
          key={dis.discipline}
          discipline={dis.discipline}
          grade={dis.grade}
          isEditable={isEditable}
        />
      ))}
      <IconButton onClick={handleOpen} aria-label="add" size="large">
        <AddCircleIcon fontSize="inherit" />
      </IconButton>
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
            width: 400,
            bgcolor: 'background.paper',
            border: '1px solid #000',
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="discipline-select-label">Discipline</InputLabel>
            <Select
              labelId="discipline-select-label"
              id="discipline-select-label"
              value={newDiscipline}
              label="Discipline"
              onChange={(e) => setNewDiscipline(e.target.value)}
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
              value={newGrade}
              label="Grade"
              onChange={(e) => setNewGrade(e.target.value)}
            >
              {grades.map((grade) => (
                <MenuItem key={grade} value={grade}>
                  {grade}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <Button onClick={updateDisciplinesState(newDiscipline, newGrade)} variant="outlined">
            Add
          </Button> */}
        </Box>
      </Modal>
    </Box>
  );
}

export default Disciplines;
