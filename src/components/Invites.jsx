import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import Invite from './Invite';
import { useUser } from '../contexts/UserContext';

function Invites() {
  const { userData } = useUser();
  const { invites } = userData;

  return (
    <Box>
      {invites.length > 0 ? (
        <Stack>
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
      ) : (
        <Typography variant="body1" color="initial">
          You got no invites
        </Typography>
      )}
    </Box>
  );
}
export default Invites;
