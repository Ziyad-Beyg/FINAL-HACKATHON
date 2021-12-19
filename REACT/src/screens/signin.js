import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../config/firebase';

import logo from '../images/logo.png';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { alpha, styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const RedditTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    border: '1px solid #eee',
    overflow: 'hidden',
    borderRadius: 4,
    width: 350,
    maxWidth: '100%',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha('#1d9bf0', 0.25)} 0 0 0 2px`,
      borderColor: '#1d9bf0',
    },
  },
}));

function SignIn() {
  const navigate = useNavigate();
  const [email, handleEmail] = useState('');
  const [password, handlePassword] = useState('');
  const [error, handleError] = useState('');

  return (
    <div className='container-fluid signin'>
      <div className='row'>
        {/* <div>
          <img src={logo} width='72%' />
        </div> */}
        <div>
          
          <div>
            <h2>
              Feed <span>Hungry</span> <br />
              <span>Help </span> Needy
            </h2>
          </div>
          <div>
            <h4>Login as an admin</h4>
            <div>
              <RedditTextField
                type='email'
                label='Email address'
                variant='filled'
                style={{ marginTop: 20, color:'black', backgroundColor:'white'}}
                value={email}
                onChange={(e) => {
                  handleEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <RedditTextField
                type='password'
                label='Password'
                variant='filled'
                style={{ marginTop: 20, color:'black', backgroundColor:'white' }}
                value={password}
                onChange={(e) => {
                  handlePassword(e.target.value);
                }}
              />
            </div>
            <div>
              <Button
                variant='contained'
                id='authBtn'
                onClick={() => {
                  if (email != '' && password != '') {
                    if(email == 'admin@gmail.com' && password == '123123'){
                    signInWithEmailAndPassword(auth, email, password)
                      .then(() => {
                        handleEmail('');
                        handlePassword('');
                        toast.success('Sign in successfully.');
                        setTimeout(() => {
                          navigate('/home');
                        }, 1000);
                      })
                      .catch((error) => {
                        handleError(error.message)
                      });
                    }
                    else{
                      toast.error("FirebaseAuthFailed/InvalidUser");
                    }
                  } else if (email == '') {
                    toast.error('Email address is required to sign in.');
                  } else if (password == '') {
                    toast.error('Password is required to sign in.');
                  }
                }}
              >
                Sign in
              </Button>
            </div>
            <p id='tc'></p>
          </div>
          <ToastContainer
            position='bottom-right'
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='dark'
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
