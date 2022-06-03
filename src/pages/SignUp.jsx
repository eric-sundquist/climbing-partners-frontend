import { useRef, useState, ReactElement } from 'react';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import { useErrorHandler } from 'react-error-boundary';
import { useAuth } from '../contexts/AuthContext';

/**
 * React functional component. Renders the sign up page.
 *
 * @returns {ReactElement} - the sign up page component.
 */
function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const acceptCheckedRef = useRef();
  const { createUser } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleError = useErrorHandler();

  /**
   * Handles sign up form submit.
   *
   * @param {object} event - the form submit event.
   * @returns {undefined}  - does not return anything.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!emailRef.current.value || !passwordRef.current.value) {
      setError('Username and/or password is missing');
      return;
    }

    if (!acceptCheckedRef.current.checked) {
      setError('You must accept our Privacy Policy to use our application');
      return;
    }

    try {
      setError('');
      setIsLoading(true);
      const userCredentials = await createUser(emailRef.current.value, passwordRef.current.value);

      const { accessToken } = userCredentials.user;
      const url = `${process.env.REACT_APP_CP_APP_API_URL}/users`;

      // Create user in api db.
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        handleError(`${res.status} - ${res.statusText}`);
      }
      await res.json();

      navigate('/profile', { replace: true });
    } catch (e) {
      if (e.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (e.code === 'auth/invalid-email') {
        setError('Not a valid email adress.');
      } else if (e.code === 'auth/email-already-in-use') {
        setError('Email is aldready in use.');
      } else {
        setError('Sign up failed.');
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
          Sign up
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <TextField
            inputRef={emailRef}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            autoComplete="email"
          />
          <TextField
            inputRef={passwordRef}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <FormControlLabel
            control={<Checkbox inputRef={acceptCheckedRef} />}
            label={
              <FormLabel>
                I have read and accept Climbing Partners{' '}
                <Link component={RouterLink} to="/privacy-policy">
                  Privacy Policy
                </Link>
              </FormLabel>
            }
          />

          <LoadingButton loading={isLoading} type="submit" fullWidth variant="contained">
            Sign Up
          </LoadingButton>
          <Link component={RouterLink} to="/login" variant="body2">
            Already have an account? Log in
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
export default SignUp;
