import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Disciplines from './Disciplines';
import { useAuth } from '../contexts/AuthContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function CreatePartnerAd() {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpenModule = () => setOpen(true);
  const handleCloseModule = () => setOpen(false);

  // Form ---
  const [date, setDate] = useState(null);
  const [disciplines, setDisciplines] = useState([]);
  const [equipment, setEquipment] = useState(false);
  const [transport, setTransport] = useState(false);
  const locationRef = useRef();
  const descriptionRef = useRef();

  const addDiscipline = (newDiscipline, newGrade) => {
    setDisciplines((prev) => {
      const newDis = {
        discipline: newDiscipline,
        grade: newGrade,
      };
      return [...prev, newDis];
    });
  };

  const removeDiscipline = (index) => {
    setDisciplines((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  };

  const postPartnerAd = async (partnerAdData) => {
    const res = await fetch(
      `${process.env.REACT_APP_CP_APP_API_URL}/users/${currentUser.uid}/partner-ad`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${currentUser.accessToken}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(partnerAdData),
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = {
      date: date,
      disciplines: disciplines,
      description: descriptionRef.current.value,
      location: locationRef.current.value,
      equipment: equipment,
      transport: transport,
    };
    console.log(input);
    postPartnerAd(input);
    handleCloseModule();
  };

  return (
    <>
      <Button onClick={handleOpenModule} variant="contained">
        Search Partner
      </Button>
      <Modal
        aria-labelledby="search-climbing-partner"
        open={open}
        onClose={handleCloseModule}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="search-climbing-partner" variant="h6" component="h2">
              Search climbing partner
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Choose day"
                  value={date}
                  onChange={(newDate) => {
                    setDate(newDate);
                  }}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                required
                id="location"
                label="Location"
                name="location"
                inputRef={locationRef}
                autoFocus
                margin="normal"
              />
              <TextField
                fullWidth
                name="description"
                label="Some more beta about what you prefere to do?"
                id="description"
                inputRef={descriptionRef}
                multiline
                minRows={4}
                margin="normal"
              />
              <Typography component="h6" variant="h6">
                What disciplines are you interested in?
              </Typography>
              <Disciplines
                disciplines={disciplines}
                addDiscipline={addDiscipline}
                removeDiscipline={removeDiscipline}
                isEditing
              />
              <FormLabel component="legend">Other:</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={equipment} onChange={() => setEquipment((prev) => !prev)} />
                  }
                  label="I have equipment"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={transport} onChange={() => setTransport((prev) => !prev)} />
                  }
                  label="I have transport"
                />
              </FormGroup>

              <Button sx={{ marginTop: 2 }} variant="contained" type="submit">
                Create search
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default CreatePartnerAd;
