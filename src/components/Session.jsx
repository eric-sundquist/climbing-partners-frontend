import { useState, ReactElement } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MessageIcon from '@mui/icons-material/Message';
import Tooltip from '@mui/material/Tooltip';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { Link as RouterLink } from 'react-router-dom';
import ExpandMore from './ExpandMore';

/**
 * React functional component. Renders user profile.
 *
 * @param {object} props - Props object for component.
 * @param {string} props.date - date of the climbing session.
 * @param {string} props.location - location of the climbing session.
 * @param {string} props.description - description of the climbing session.
 * @param {object} props.withUser - user to climb with.
 * @returns {ReactElement} - profile component.
 */
function Session({ date, location, description, withUser }) {
  const [expanded, setExpanded] = useState(false);
  const { profile } = withUser;

  /**
   * Toggle expand more.
   */
  const handleExpandClick = () => {
    setExpanded(!expanded);
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
              state={{ user: withUser }}
            >
              <Avatar />
            </IconButton>
          </Tooltip>
        }
        action={
          <Tooltip title="Send message">
            <IconButton
              aria-label="chat"
              component={RouterLink}
              to="/chat"
              state={{ withUserId: withUser.id }}
            >
              <MessageIcon fsx={{ fontSize: 30 }} />
            </IconButton>
          </Tooltip>
        }
        title={`Climbing session with ${profile.name}`}
        titleTypographyProps={{ variant: 'subtitle2' }}
        subheader={`Climbing in ${location}. ${format(parseISO(date), 'PPPP')}`}
      />

      <CardActions disableSpacing>
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
                Description:
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

export default Session;
