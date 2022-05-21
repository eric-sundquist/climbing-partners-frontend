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
import Alert from '@mui/material/Alert';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Disciplines from './Disciplines';
import { useUser } from '../contexts/UserContext';

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
  overflow: 'scroll',
  maxHeight: '100vh',
  minWidth: 350,
};

function CreatePartnerAd() {
  const { postPartnerAd } = useUser();

  const [open, setOpen] = useState(false);
  const handleOpenModule = () => setOpen(true);
  const handleCloseModule = () => setOpen(false);
  const today = new Date();
  const [error, setError] = useState('');

  // Form ---
  const [date, setDate] = useState(today);
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

  const postAd = async () => {
    const input = {
      date: date,
      disciplines: disciplines,
      description: descriptionRef.current.value,
      location: locationRef.current.value,
      equipment: equipment,
      transport: transport,
    };
    postPartnerAd(input);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (date && locationRef.current.value && descriptionRef.current.value) {
      postAd();
      handleCloseModule();
      setError('');
    } else {
      setError('Please fill in a date, location and description');
    }
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
            <Typography sx={{ mt: 2 }} id="search-climbing-partner" variant="h6" component="h2">
              Search climbing partner
            </Typography>
            {error && (
              <Alert sx={{ mb: 2 }} severity="error">
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Choose date"
                  value={date}
                  minDate={today}
                  onChange={(newDate) => {
                    setDate(newDate);
                  }}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                id="location"
                label="Location"
                name="location"
                inputRef={locationRef}
                autoFocus
                margin="normal"
                helperText="The location will filter what search results you get. Please provide the most accurate naming possible."
              />
              <TextField
                fullWidth
                name="description"
                label="More information about what you would like to do"
                id="description"
                inputRef={descriptionRef}
                multiline
                minRows={4}
                margin="normal"
              />
              <Typography component="h6" variant="h6">
                What disciplines and grades?
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

              <Button sx={{ marginTop: 1, mb: 2 }} variant="contained" type="submit">
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
