import { useRef, useState, ReactElement } from 'react';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuth } from '../contexts/AuthContext';

/**
 * React functional component. Renders reset password page.
 *
 * @returns {ReactElement} - the reset password page component.
 */
function ResetPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles submit of reset password form.
   *
   * @param {object} event - the form submit event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError('');
      setInfo('');
      setIsLoading(true);
      await resetPassword(emailRef.current.value);
      setInfo('An email reset email has been sent. Please check your inbox.');
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        setError('No registered user with that email.');
      } else if (e.code === 'auth/invalid-email') {
        setError('Not a valid email adress.');
      } else {
        setError('Password reset failed.');
      }
    }

    setIsLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {info && <Alert severity="info">{info}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            inputRef={emailRef}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </LoadingButton>
          <Button
            component={RouterLink}
            to="/login"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
          >
            Log in
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
export default ResetPassword;
