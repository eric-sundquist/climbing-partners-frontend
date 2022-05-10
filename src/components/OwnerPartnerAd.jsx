import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Disciplines from './Disciplines';
import { useUser } from '../contexts/UserContext';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function OwnerPartnerAd({ date, location, description, disciplines, equipment, transport, id }) {
  const { userData, deleteAd } = useUser();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        action={
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
        }
      />

      <CardActions disableSpacing>
        <Button>View matched</Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography gutterBottom variant="h6">
            Description:
          </Typography>
          <Typography gutterBottom variant="body1">
            {description}
          </Typography>
          <Typography gutterBottom variant="h6">
            Disciplines:
          </Typography>
          <Box>{disciplines.length > 0 && <Disciplines disciplines={disciplines} />}</Box>
          <Typography gutterBottom variant="h6">
            Other:
          </Typography>
          {equipment && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckIcon />
              <Typography variant="body1" color="initial">
                Equipment
              </Typography>
            </Box>
          )}

          {transport && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckIcon />
              <Typography variant="body1" color="initial">
                Transport
              </Typography>
            </Box>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default OwnerPartnerAd;
