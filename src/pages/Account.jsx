import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useAuth } from '../contexts/AuthContext';

function Account() {
  const [error, setError] = useState('');
  const { currentUser, logoutUser } = useAuth();
  const navigate = useNavigate();

  console.log(currentUser);

  const handleLogout = async () => {
    setError('');
    try {
      await logoutUser();
      navigate('/login', { replace: true });
    } catch (er) {
      setError(`Failed to log out! ${er.message}`);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      {error && <Alert severity="error">{error}</Alert>}
      <h2>Profile!</h2>
      {!currentUser && <h3>Not loggoed in!</h3>}
      {currentUser && (
        <div>
          <p>Email: {currentUser.email}</p>
          <Button variant="contained" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      )}

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
