import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Session from './Session';
import { useUser } from '../contexts/UserContext';

function Sessions() {
  const { sessions } = useUser().userData;

  return (
    <Box sx={{ pb: 2 }}>
      {sessions.length > 0 && (
        <Stack spacing={2}>
          <Typography variant="h6">Upcoming climbing sessions:</Typography>
          {sessions
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((session) => (
              <Session
                // eslint-disable-next-line no-underscore-dangle
                key={session._id}
                date={session.date}
                location={session.location}
                description={session.description}
                withUser={session.withUser}
              />
            ))}
        </Stack>
      )}
    </Box>
  );
}
export default Sessions;
