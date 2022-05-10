import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useUser } from '../contexts/UserContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  minWidth: '350px',
  border: '1px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
function MatchingPartners({ location, date }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { searchMatchingPartners } = useUser();
  const [matched, setMatched] = useState();

  const getMatches = async () => {
    const result = await searchMatchingPartners(date, location);
    console.log('MATCH RESULTS....!');
    console.log(result);
    // setMatched(result);
  };

  return (
    <div>
      <Button
        onClick={() => {
          handleOpen();
          getMatches();
        }}
      >
        VIEW MATCHED CLIMBERS
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" gutterBottom variant="h6" component="h2">
              Matched climbers in {location}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default MatchingPartners;
