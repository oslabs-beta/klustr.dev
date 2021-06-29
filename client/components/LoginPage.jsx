import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { AppContext } from './AppContext'



const LoginPage = (props) => {
  const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState();
  const [incorrectInfo, setIncorrectInfo] = useState('');
  let history = useHistory();

  // when the component re-renders, check if the isLoggedIn is truthy and push
  // homepage endpoint so the route can render the proper page

  useEffect(() => {
    if (isLoggedIn) {
      console.log(isLoggedIn, 'is logged in login')
      if (isAdmin) history.push('/admin')
      else {
        history.push('/vcluster')
      }
    }
  })

  const formSubmit = (e) => {
    e.preventDefault();
    setRedirect(true);
  }

  const handleSubmit = (e) => {
    console.log('submitted')
    e.preventDefault();
    const form = e.target

    e.preventDefault();
    fetch(form.action, {
      method: form.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data === 'Incorrect username/password') setIncorrectInfo(<p>Incorrect username/password</p>);
        else {
          fetch('/user/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token,
            })
          })
            .then(res => {
              return res.json();
            })
            .then(res => {
              setIsAdmin(res);
              if (typeof res === 'boolean') {
                setIsLoggedIn(true);
              }
              if (isAdmin) history.push('/admin')
              else history.push('/vcluster')
            })
        }
      })
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div id='LoginPage'>
      <form id='LoginForm' method="POST" action="/user/login" onSubmit={handleSubmit}>
        <TextField label='Email' name='email' id='filled-basic' onChange={handleEmail}></TextField><br></br>
        <TextField label='Password' type='password' name='password' id='filled-basic' onChange={handlePassword}></TextField><br></br>
        {incorrectInfo}
        <Button type="submit" variant="contained" color="secondary">Login</Button>
      </form>
    </div>
  )
}

export default LoginPage;