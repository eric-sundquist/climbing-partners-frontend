import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function Loading() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Box sx={{ width: 400, maxWidth: '90%' }}>
        <Stack spacing={1}>
          <Skeleton variant="text" />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      </Box>
    </Container>
  );
}

export default Loading;
