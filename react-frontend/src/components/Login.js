import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import { handleLogin, getUsers} from "../utils/utilities";
import { Button } from '@material-ui/core';
import  { Redirect } from 'react-router-dom'



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
    // margin: theme.spacing(20,0,2)
  },
  submit: {
    margin: theme.spacing(3,0,3),
  },
  errorMsg: {
    color: "red",
  },
}))

export default function Login() {
  
  const [value, setValue] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
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
    const response = await handleLogin(value);
    const { status } = response.data
    console.log(status)
    if (status === 200) {
      window.location = "/home";
    }
    else if (status == 409) {
      setErrorMsg("The email you've entered does not match any account");
    }
    else if (status == 410) {
      setErrorMsg("The password you've entered is incorrect.")
    }
}

  return (
    <div>
        <Grid
        className={classes.root}
        >
          <Container component="main" maxwidth="xs">
            <Paper className={classes.paper}>
              Sign In Page
              <form noValidate>
                <TextField 
                margin="normal" 
                variant="outlined"
                required
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
                margin="normal" 
                variant="outlined"
                required
                value={value.password || ""}
                onChange={onChange}
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                />
                <br/>
                <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                >
                Submit
                </Button>
                <div className={classes.errorMsg}>
                  {errorMsg}
                </div>
              </form>
            </Paper>
          </Container>
        </Grid>
    </div>
  )
}
