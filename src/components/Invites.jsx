import { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Invite from './Invite';
import { useUser } from '../contexts/UserContext';

/**
 * React function component. Renders container for invite cards.
 *
 * @returns {ReactElement} - container component.
 */
function Invites() {
  const { userData } = useUser();
  const { invites } = userData;

  return (
    <Box>
      {invites.length > 0 && (
        <Stack spacing={2}>
          {invites.map((invite) => (
            <Invite
              // eslint-disable-next-line no-underscore-dangle
              key={invite._id}
              // eslint-disable-next-line no-underscore-dangle
              id={invite._id}
              date={invite.ad.date}
              location={invite.ad.location}
              description={invite.ad.description}
              name={invite.fromUser.profile.name}
              profile={invite.fromUser.profile}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
export default Invites;
