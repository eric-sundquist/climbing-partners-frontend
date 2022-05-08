import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Disciplines from './Disciplines';
import { useUser } from '../contexts/UserContext';

function OwnerPartnerAd({ date, location, description, disciplines, equipment, transport, id }) {
  const { userData, deleteAd } = useUser();
  return (
    <Card sx={{ mt: 2 }}>
      <CardHeader
        avatar={
          <Avatar>
            <TravelExploreIcon />
          </Avatar>
        }
        title={` Climb in ${location}`}
        titleTypographyProps={{ variant: 'h6' }}
        subheader={format(parseISO(date), 'PPPP')}
      />
      <CardContent>
        <Typography variant="body1">{description}</Typography>
        {/* {disciplines.length > 0 && <Disciplines disciplines={disciplines} />} */}
      </CardContent>
      <CardActions>
        <Box sx={{ flexGrow: 1 }}>
          <Button size="small">View matched</Button>
        </Box>
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() => {
              deleteAd(id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default OwnerPartnerAd;
