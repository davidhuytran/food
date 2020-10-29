import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import { handleSignUp, getUsers } from "../utils/utilities";
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    background: "linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)",
    minWidth: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  background: {
    backgroundColor: "orange",
    minHeight: "100vh"
  },
  paper: {
    textAlign: "center",
    borderRadius: 30,
    width: "40%"
  },
  submit: {
    margin: theme.spacing(3,0,3),
    width: "15%"
  },
  errorMsg: {
    color: "red",
  },
  textfield1: {
    [`& fieldset`]: {
      borderRadius: 15,
    },
    margin: theme.spacing(3,0,3),
    width: "45%",
  },
  textfield2: {
    [`& fieldset`]: {
      borderRadius: 15,
    },  
    margin: theme.spacing(0,0,3),
    width: "45%",
  },
}))

export default function SignUp() {
  
  const [errorMsg, setErrorMsg] = useState("");
  const [value, setValue] = useState({});
  const classes = useStyles();

  function onChange(e) {
    e.preventDefault();
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await handleSignUp(value);
    const { status } = response.data
    console.log(response);
    console.log(status);
    if (status == 200) {
      window.location = "/";
    }
    else if (status == 400 ) {
      setErrorMsg("Account already exists.")
    }
}
  return (
    <div>
        <Grid
        className={classes.root}
        >
          <Grid 
          container 
          spacing={0} 
          direction="column" 
          alignItems="center"
          justify="center">
            <Paper className={classes.paper}>
              
              <form noValidate>
                <TextField 
                className={classes.textfield1}
                margin="normal" 
                variant="outlined"
                value={value.email || ""}
                onChange={onChange}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                />
                <br/>
                <TextField 
                className={classes.textfield2}
                margin="normal" 
                variant="outlined"
                value={value.password || ""}
                onChange={onChange}
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                />
                <br/>
                <div className={classes.errorMsg}>
                  {errorMsg}
                </div>
              </form>
            </Paper>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                >
                Sign Up
                </Button>
          </Grid>
        </Grid>
    </div>
  )
}
