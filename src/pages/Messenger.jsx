import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function Chats() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          Side menu
        </Grid>
        <Grid item xs={12} md={8}>
          Chat window
        </Grid>
      </Grid>
    </Container>
  );
}

export default Chats;
