import * as React from 'react';
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
import MessageIcon from '@mui/icons-material/Message';
import Tooltip from '@mui/material/Tooltip';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { Link as RouterLink } from 'react-router-dom';
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

function Session({ id, date, location, description, name, profile }) {
  // const { } = useUser();
  const [expanded, setExpanded] = React.useState(false);
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
              state={{ profile: profile }}
            >
              <Avatar />
            </IconButton>
          </Tooltip>
        }
        action={
          <Tooltip title="Send message">
            <IconButton aria-label="chat" component={RouterLink} to="/chat" state={{}}>
              <MessageIcon fsx={{ fontSize: 30 }} />
            </IconButton>
          </Tooltip>
        }
        title={`Climbing session with ${name}`}
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
