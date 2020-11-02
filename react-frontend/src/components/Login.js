import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import { handleLogin } from "../utils/utilities";
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    background: "linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)",
    minWidth: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    backgroundColor: "orange",
    minHeight: "100vh"
  },
  paper: {
    width: "100%",
    borderRadius: 30,
  },
  submit: {
    margin: theme.spacing(3,0,0),
    width: "80%"
  },
  errorMsg: {
    color: "red",
  },
  textfield1: {
    [`& fieldset`]: {
      borderRadius: 15,
    },
    margin: theme.spacing(3,1,2),
    width: "90%",
  },
  textfield2: {
    [`& fieldset`]: {
      borderRadius: 15,
    },  
    margin: theme.spacing(1,1,3),
    width: "90%",
  },
  form: {
    justifyContent: "center",
    justify: "center",
    textAlign: "center",
  }
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
    if (!value.password){
      setErrorMsg("Please enter a password.");
    }
    if (status === 200) {
      window.location = "/home";
    }
    else if (status == 409) {
      setErrorMsg("The email you've entered does not match any account.");
    }
    else if (status == 410) {
      setErrorMsg("The password you've entered is incorrect.")
    }
}

return (
  <div className={classes.root}>
    <Container maxWidth="xs">
      <Grid container justify="center" spacing={0} direction="column" alignItems="center">
          <Paper className={classes.paper}>
            <form noValidate className={classes.form}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12} justify="center">
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
                borderRadius="10"
                />
                <div className={classes.errorMsg}>
                  {errorMsg}
                </div>
              </Grid>
            </form>
          </Paper>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
          >
        Login
          </Button>
      </Grid>
    </Container>
  </div>
  )
}



