import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useAuth } from '../contexts/AuthContext';

function Account() {
  const { currentUser } = useAuth();

  return (
    <Container component="main" maxWidth="md">
      <h1>Account</h1>

      <h4>Email: {currentUser.email}</h4>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci tempora labore, iste quis
        maxime aspernatur atque. Beatae optio incidunt facere quasi nam quae vitae, necessitatibus
        ipsum eos alias illum dolor? Suscipit iste corrupti impedit quisquam! Molestiae animi eius
        dolore suscipit.
      </p>
    </Container>
  );
}

export default Account;
