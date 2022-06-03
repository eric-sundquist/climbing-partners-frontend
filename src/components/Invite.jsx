import { useState, ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Tooltip from '@mui/material/Tooltip';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { Link as RouterLink } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

/**
 * React function component. Renders invite card.
 *
 * @param {object} props - Props object for component.
 * @param {string} props.id - invite id.
 * @param {object} props.date - date of ad invite is related to.
 * @param {string} props.location - location of ad invite is related to.
 * @param {string} props.description - description of ad invite is related to.
 * @param {string} props.name - name of user who sent invite.
 * @param {object} props.profile - profile of user who sent invite.
 * @returns {ReactElement} - invite card component.
 */
function Invite({ id, date, location, description, name, profile }) {
  const { deleteInvite, acceptInvite } = useUser();
  const [expanded, setExpanded] = useState(false);

  /**
   * Toggle card expansion.
   */
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  /**
   * Handles user accept of invite.
   */
  const handleAcceptInvite = () => {
    acceptInvite(id);
  };

  /**
   * Handles user decline of invite.
   */
  const handleDeclineInvite = () => {
    deleteInvite(id);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Tooltip title="Go to Profile">
            <IconButton
              aria-label="avatar"
              component={RouterLink}
              to="/view-profile"
              state={{ profile: profile }}
            >
              <Avatar />
            </IconButton>
          </Tooltip>
        }
        title={`Invite from ${name}`}
        titleTypographyProps={{ variant: 'subtitle2' }}
        subheader={`Climbing in ${location}. ${format(parseISO(date), 'PPPP')}`}
      />

      <CardActions disableSpacing>
        <Tooltip title="Accept invite">
          <IconButton aria-label="Accept invite" onClick={handleAcceptInvite}>
            <CheckCircleOutlineIcon sx={{ fontSize: '30px' }} color="success" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Decline invite">
          <IconButton aria-label="chat" onClick={handleDeclineInvite}>
            <DoNotDisturbIcon sx={{ fontSize: '30px' }} color="error" />
          </IconButton>
        </Tooltip>
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
          {description && (
            <>
              <Typography gutterBottom variant="subtitle2">
                Regarding your search with description:
              </Typography>

              <Typography gutterBottom variant="body2">
                {description}
              </Typography>
            </>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Invite;
