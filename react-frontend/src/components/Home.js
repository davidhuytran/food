import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import { gql, useQuery } from '@apollo/client';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { getUser } from "../utils/utilities"
import KitchenIcon from '@material-ui/icons/Kitchen';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';


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
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  paper: {
    width: "90%",
    borderRadius: 30,
    minHeight: "85vh",
    margin: theme.spacing(7,0,0),
    textAlign: "center",
    maxHeight: "85vh",

  },
  fabButton: {
    zIndex: 1,
    height: "6vh",
    width: "6vh",
    margin: theme.spacing(-6,2,0)
  },
  context: {
    minHeight: "80vh",
  },
  contextFooter: {
    justifyContent: "flex-end",
    alignContent: "flex-end",
    
  },
  add: {
    width: "6vw",

  }
}));

const GET_USER = gql`
  query GetUser($email: String!) {
    user(email: $email) {
      email
      categories {
        id
        name
      }
    }
  }
`;

// const GET_CATEGORY = gql`

// `;

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({});
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    async function fetchData() {
      const user = await getUser();
      await setUser(user.data);
    }
    fetchData();
  }, [])

  function handleList(e, value) {
    e.preventDefault();
    setCategoryId(value);
  }

  const { loading: loading_user, error, data: data_user } = useQuery(GET_USER, {
    variables: {email: user.email},
  });
  if (loading_user) return 'Loading...';
  if (error) return 'Something bad has happened';
  if (!data_user.user) return (
    <div> Loading </div>
  )

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Categories'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon> <KitchenIcon/> </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {data_user.user.categories.map((text, index) => (
          <ListItem button key={text.id} value={text.id} onClick={e => handleList(e, text.id)}>
            <ListItemIcon>{index % 2 === 0 ? <FastfoodIcon /> : <EmojiFoodBeverageIcon />}</ListItemIcon>
            <ListItemText primary={text.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  async function more(e) {
    e.preventDefault();
    console.log("more");
  }

  async function search(e) {
    e.preventDefault();
    console.log("search");
  }

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <IconButton>
                  <MenuIcon/>
                </IconButton>
              </Button>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
              <Grid container justify="flex-end">
                <IconButton onClick={search}>
                  <SearchIcon/>
                </IconButton>
                <IconButton onClick={more}>
                  <MoreIcon />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs">
        <Grid container justify="center" spacing={0} direction="column" alignItems="center">
          <Paper className={classes.paper}>
            All Foods
            <Grid container className={classes.context}>
              {categoryId}
            </Grid>
            <Grid container className={classes.contextFooter}>
              <Fab color="secondary" aria-label="add" className={classes.fabButton}>
                <AddIcon className={classes.add}/>
              </Fab>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
}
