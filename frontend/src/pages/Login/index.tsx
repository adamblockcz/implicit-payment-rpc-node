import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { Button, Container, Typography } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // White background color
    backgroundImage: `radial-gradient(#c0c0c0 1px, transparent 1px), radial-gradient(#c0c0c0 1px, transparent 1px)`, // Slightly darker grey dots pattern
    backgroundSize: '20px 20px', // Adjust the size of the dots
  },
  logo: {
    width: '150px', // Adjust the width as needed
    marginBottom: theme.spacing(4),
  },
  loginBox: {
    backgroundColor: '#fff', // White background color for login box
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[5],
    textAlign: 'center',
  },
  welcomeBox: {
    backgroundColor: 'transparent',
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  connectButtonContainer: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    width: '100%', // Ensure button occupies full width
  },
}));

const LoginPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* Logo and login box components */}
      <Container maxWidth="xs" className={classes.welcomeBox}>
      <Typography variant="h3" gutterBottom>
          Welcome to RPCGo
        </Typography>
      </Container>
      <Container maxWidth="xs" className={classes.loginBox}>
        
        <Typography variant="body1" gutterBottom>
          Please connect your wallet to sign-in or register.
        </Typography>
        <div className={classes.connectButtonContainer}>
        <w3m-connect-button />
        </div>
        </Container>
    </div>
  );
};

export default LoginPage;
