import { useState, ReactElement } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';
import Disciplines from './Disciplines';
import { useUser } from '../contexts/UserContext';
import ExpandMore from './ExpandMore';

/**
 * React functional component. Renders partner ad created by current user.
 *
 * @param {object} props - Props object for component.
 * @param {string} props.id - Ad id.
 * @param {object} props.date - date of ad.
 * @param {string} props.location - location of ad.
 * @param {string} props.description - description of ad.
 * @param {object[]} props.disciplines - Disciplines choosen for ad.
 * @param {boolean} props.equipment - user has equipment or not.
 * @param {boolean} props.transport - user har transport or not.
 * @returns {ReactElement} - partner ad component.
 */
function OwnerPartnerAd({ date, location, description, disciplines, equipment, transport, id }) {
  const { deleteAd } = useUser();
  const [expanded, setExpanded] = useState(false);

  /**
   * Toggles expand more button.
   */
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
        <Button
          component={RouterLink}
          to="/search"
          state={{ date: date, location: location, adId: id }}
          variant="text"
          color="primary"
        >
          View matched climbers
        </Button>
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
