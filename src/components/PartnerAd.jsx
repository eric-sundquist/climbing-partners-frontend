import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MessageIcon from '@mui/icons-material/Message';
import CheckIcon from '@mui/icons-material/Check';
import { Link as RouterLink } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Disciplines from './Disciplines';

import { useUser } from '../contexts/UserContext';

function PartnerAd({ id, description, disciplines, equipment, transport, owner }) {
  const { sendInvite } = useUser();

  const handleSendInvite = () => {
    sendInvite(owner.uid, id);
    // set flash message confirm invite sent.
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardHeader
        avatar={
          <Tooltip title="Go to Profile">
            <IconButton
              aria-label="avatar"
              component={RouterLink}
              to="/view-profile"
              state={{ profile: owner.profile }}
            >
              <Avatar />
            </IconButton>
          </Tooltip>
        }
        action={
          <>
            <Tooltip title="Send invite" sx={{ pr: 2 }}>
              <IconButton aria-label="Send invite" onClick={handleSendInvite}>
                <PersonAddIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Send message">
              <IconButton aria-label="chat" component={RouterLink} to="/chat" state={{}}>
                <MessageIcon fsx={{ fontSize: 30 }} />
              </IconButton>
            </Tooltip>
          </>
        }
        title={owner.profile.name}
        titleTypographyProps={{ variant: 'h6' }}
      />

      <CardContent>
        {description && (
          <>
            <Typography gutterBottom variant="h6">
              Description:
            </Typography>

            <Typography gutterBottom variant="body1">
              {description}
            </Typography>
          </>
        )}
        {disciplines.length > 0 && (
          <>
            <Typography gutterBottom variant="h6">
              Disciplines:
            </Typography>
            <Box>{disciplines.length > 0 && <Disciplines disciplines={disciplines} />}</Box>
          </>
        )}
        {(equipment || transport) && (
          <Typography gutterBottom variant="h6">
            Other:
          </Typography>
        )}
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
      {/* <CardActions>
        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title="Send invite" sx={{ pr: 2 }}>
          <IconButton aria-label="Send invite" onClick={handleSendInvite}>
            <PersonAddIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Send message">
          <IconButton aria-label="chat" component={RouterLink} to="/chat" state={{}}>
            <MessageIcon fsx={{ fontSize: 30 }} />
          </IconButton>
        </Tooltip>
      </CardActions> */}
    </Card>
  );
}

export default PartnerAd;
