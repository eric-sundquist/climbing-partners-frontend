import { useState, ReactElement } from 'react';
import Alert from '@mui/material/Alert';
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
/**
 * React function component. Renders partner ad created by other user.
 *
 * @param {object} props - Props object for component.
 * @param {string} props.id - Ad id.
 * @param {string} props.description - description of ad.
 * @param {object[]} props.disciplines - Disciplines choosen for ad.
 * @param {boolean} props.equipment - user has equipment or not.
 * @param {boolean} props.transport - user har transport or not.
 * @param {object} props.owner - owner of ad.
 * @param {string} props.currentUserAdId - ad id of the current users ad that matched with this ad.
 * @returns {ReactElement} - partner ad component.
 */
function PartnerAd({ id, description, disciplines, equipment, transport, owner, currentUserAdId }) {
  const { sendInvite } = useUser();
  const [isInvBtnDisabled, setIsInvBtnDisabled] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const handleSendInvite = () => {
    sendInvite(owner.uid, id, currentUserAdId);
    setIsInvBtnDisabled(true);
    setIsAlert(true);
  };

  return (
    <Card sx={{ mt: 2 }}>
      {isAlert && (
        <Alert sx={{ m: 2 }} severity="success">
          Invite has been sent!
        </Alert>
      )}
      <CardHeader
        avatar={
          <Tooltip title="Go to Profile">
            <IconButton
              aria-label="avatar"
              component={RouterLink}
              to="/view-profile"
              state={{ user: owner }}
            >
              <Avatar />
            </IconButton>
          </Tooltip>
        }
        action={
          <>
            <Tooltip title="Send invite" sx={{ mr: 1 }}>
              <IconButton
                disabled={isInvBtnDisabled}
                aria-label="Send invite"
                onClick={handleSendInvite}
              >
                <PersonAddIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Send message">
              <IconButton
                aria-label="chat"
                component={RouterLink}
                to="/chat"
                state={{ withUserId: owner.id }}
              >
                {' '}
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
    </Card>
  );
}

export default PartnerAd;
