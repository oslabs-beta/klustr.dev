import React, { useState, useEffect, useContext } from "react";
import { Button, TextField, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AppContext } from "./AppContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import dashboardIcon from "../assets/dashboard-icon.svg";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary,
  },
  root: {
    "& .MuiFilledInput-root": {
      background: "#d5d5d5",
    },
  },
  paper: {
    textAlign: "center",
  },
}));

const LoginPage = () => {
  const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } =
    useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();
  const [incorrectInfo, setIncorrectInfo] = useState("");
  let history = useHistory();

  const classes = useStyles();

  // when the component re-renders, check if the isLoggedIn is truthy and push
  // homepage endpoint so the route can render the proper page

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/home");
    }
  });

  const formSubmit = (e) => {
    e.preventDefault();
    setRedirect(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    e.preventDefault();
    fetch(form.action, {
      method: form.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data === "Incorrect username/password")
          setIncorrectInfo(<p>Incorrect username/password</p>);
        else {
          fetch("/user/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              setIsAdmin(res);
              if (typeof res === "boolean") {
                setIsLoggedIn(true);
              }
              if (isAdmin) history.push("/admin");
              else history.push("/home");
            });
        }
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div id='LoginPage'>
      <div className={classes.root}>
        <Grid
          container
          spacing={3}
          direction='row'
          justify-content='flex-start'
          alignitems='stretch'
        >
          <Grid item xs={6}>
            <div id='leftPaneLogin' className='shadow'>
              <Box
                display='flex'
                justifyContent='flex-start'
                alignItems='center'
                minHeight='15vh'
              >
                <img
                  src={require("../assets/transparentohana.png")}
                  alt='ohana'
                  className='ohana_logo'
                />
              </Box>
              <Box
                display='flex'
                flexDirection='column'
                alignContent='center'
                justifyContent='center'
                minHeight='68vh'
              >
                <Box
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  minHeight='50vh'
                  flexDirection='column'
                  justifySelf='center'
                >
                  <div>
                    <h3>Aloha, welcome to Ohana</h3>
                  </div>
                  <img src={dashboardIcon} id='computer' />
                  <div>
                    <h4>Effortless K8s Management</h4>
                  </div>
                </Box>
              </Box>
            </div>
          </Grid>
          <Grid item xs={4} justify-self='center' alignItems='center'>
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              minHeight='100vh'
            >
              <form
                style={{ width: "100%" }}
                id='LoginForm'
                method='POST'
                action='/user/login'
                onSubmit={handleSubmit}
              >
                <h2>Sign in</h2>
                <TextField
                  style={{ width: "100%" }}
                  className={classes.root}
                  id='outlined-basic'
                  variant='outlined'
                  label='Email'
                  name='email'
                  onChange={handleEmail}
                ></TextField>
                <br></br>
                <TextField
                  style={{ width: "100%" }}
                  className={classes.root}
                  id='outlined-basic'
                  variant='outlined'
                  label='Password'
                  type='password'
                  name='password'
                  onChange={handlePassword}
                ></TextField>
                <br></br>
                {incorrectInfo}
                <Button
                  style={{ width: "100%" }}
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  Login
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default LoginPage;
