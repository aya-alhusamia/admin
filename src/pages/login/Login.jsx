import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Link } from '@mui/material';
import { styled } from '@mui/system';

const LoginContainer = styled('div')({
  height: '1000px',
  width: '100%',
  background: 'linear-gradient(to right, #f8b500, #fceabb)',
});

const LoginBox = styled('div')({
  width: '1050px',
  height: '600px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#fff',
  borderRadius: '10px',
  boxShadow: '1px 4px 22px -8px rgba(0, 0, 0, 0.4)',
  display: 'flex',
  overflow: 'hidden',
});

const Left = styled('div')({
  width: '41%',
  height: '100%',
  padding: '25px 25px',
  background: 'linear-gradient(-45deg, #dcd7e0, #fff)',
});

const Right = styled('div')({
  width: '59%',
  height: '100%',
  background: 'linear-gradient(212.38deg, rgba(240, 237, 65, 0.7) 0%, #e7a31cb5 100%),url(https://dash.osheacosmetics.com/images/oshea.jpg)',
  color: '#fff',
  position: 'relative',
});

const TopLink = styled('div')({
  height: '20px',
});

const TopLinkText = styled(Link)({
  color: '#e7a31cb5',
  fontWeight: '400',
  textDecoration: 'none',
});

const Contact = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  height: '100%',
  width: '73%',
  margin: 'auto',
});

const Form = styled('form')({
  width: '100%',
});

const Heading = styled(Typography)({
  textAlign: 'center',
  marginBottom: '40px',
});

const Input = styled(TextField)({
  margin: '15px 0',
  width: '100%',
});

const SubmitButton = styled(Button)({
  padding: '15px 70px',
  borderRadius: '8px',
  display: 'block',
  margin: 'auto',
  marginTop: '120px',
  background: '#e7a31cb5',
  color: '#fff',
  fontWeight: 'bold',
  boxShadow: '0px 9px 15px -11px rgba(88,54,114,1)',
});

const RightText = styled('div')({
  height: '100%',
  position: 'relative',
  transform: 'translate(0%, 45%)',
});

const RightTextH2 = styled(Typography)({
  display: 'block',
  width: '100%',
  textAlign: 'center',
  fontSize: '50px',
  fontWeight: '500',
});

const RightTextH5 = styled(Typography)({
  display: 'block',
  width: '100%',
  textAlign: 'center',
  fontSize: '19px',
  fontWeight: '400',
});

const RightInductor = styled('div')({
  position: 'absolute',
  width: '70px',
  height: '7px',
  background: 'transparent',
  left: '50%',
  bottom: '70px',
  transform: 'translate(-50%, 0%)',
});

const TopLinkImg = styled('img')({
  width: '28px',
  paddingRight: '7px',
  marginTop: '-3px',
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    const email = document.getElementById('email').value;
    if (email === 'admin') {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('authToken', 'your-auth-token');
      navigate('/home');
    } else {
      localStorage.setItem('userRole', 'employee');
      localStorage.setItem('authToken', 'your-auth-token');
      navigate('/userList');
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Left>
          <Contact>
            <Form>
              <Heading variant="h3">SIGN IN</Heading>
              <Input id="email" variant="standard" placeholder="EMAIL" fullWidth type="email"/>
              <Input variant="standard" placeholder="PASSWORD" type="password" fullWidth />
              <SubmitButton variant="contained" onClick={handleLogin}>
                LET'S GO
              </SubmitButton>
            </Form>
          </Contact>
        </Left>
        <Right>
          <RightText>
            <RightTextH2 variant="h2">OSHEA</RightTextH2>
            <RightTextH5 variant="h5">Oshea Order System</RightTextH5>
          </RightText>
        </Right>
      </LoginBox>
    </LoginContainer>
  );
}

export default Login;
