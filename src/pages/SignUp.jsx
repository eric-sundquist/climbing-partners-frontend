import { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';

const theme = createTheme();

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { createUser } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!emailRef.current.value || !passwordRef.current.value) {
      setError('Username and/or password is missing');
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
        throw new Error(`${res.statusText} - POST request failed`);
      }

      navigate('/', { replace: true });
    } catch (e) {
      if (e.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (e.code === 'auth/invalid-email') {
        setError('Not a valid email adress.');
      } else if (e.code === 'auth/email-already-in-use') {
        setError('Email is aldready in use.');
      } else {
        // eslint-disable-next-line no-console
        console.log(e.message);
        setError('Sign up failed.');
      }
    }

    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
            <Button
              disable={isLoading ? 'true' : undefined}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}