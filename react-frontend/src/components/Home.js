import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import IconButton from "@material-ui/core/IconButton";



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

}))

export default function Login() {
  const classes = useStyles();

  return (
    <div>
      Test
    </div>
  )
}
