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
import { gql, useQuery, useMutation } from '@apollo/client';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { getUser } from "../utils/utilities"
import KitchenIcon from '@material-ui/icons/Kitchen';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    background: "linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)",
    minWidth: "100%",
    display: "flex",
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
  header: {
    minHeight: "8vh",
    maxHeight: "8vh",
    alignContent: "flex-end",
    // backgroundColor: "yellow",
    zIndex: 1,
  },
  context: {
    minHeight: "67vh",
    maxHeight: "67vh",
    justifyContent: "flex-start",
    overflow: "scroll",
    // backgroundColor: "green",
  },
  contextFooter: {
    minHeight: "10vh",
    justifyContent: "flex-end",
    alignContent: "flex-start",
    // backgroundColor: "red",
    zIndex:2,
    
  },
  fabButton: {
    zIndex: 1,
    height: "6vh",
    width: "6vh",
    margin: theme.spacing(1,3,0)
  },
  add: {
    width: "6vw",
  },
  foodImg: {
    width:"20vw",
    height: "auto",
    margin: theme.spacing(1,2,1),
  }
}));

export default function Home() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState({});
  const [categoryId, setCategoryId] = useState("");
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    async function fetchData() {
      const user = await getUser();
      await setUser(user.data);
    }
    fetchData();
  }, [])

  function HandleList(e, value) {
    e.preventDefault();
    setCategoryId(value); //Category ID to work with
  }

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

const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      name
      recipesList {
        name
      }
    }
  }
`;

  const { loading: loading_user, error_user, data: data_user } = useQuery(GET_USER, {
    variables: {email: user.email},
  });
  const { loading: loading_category, error_category, data: data_category } = useQuery(GET_CATEGORY, {
    variables: {id: categoryId}
  });

  if (loading_user) return 'Loading...';
  if (error_user) return 'Something bad has happened';
  if (!data_user) return (
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
          <ListItem button key={text.id} value={text.id} onClick={e => HandleList(e, text.id)}>
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

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleAdd = () => {
    console.log("add"); //Add function to add recipe
    setOpen(false);
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

            <Grid container className={classes.header} justify="center">
              <Typography variant="h4" gutterBottom>
                {(data_category) ? data_category.category.name : "All Foods"}
              </Typography>
            </Grid>

            <Grid container className={classes.context}>
              <div>
                {(data_category) ? data_category.category.recipesList.map((text, index) => (
                    <Grid item xs={12} sm container>
                      <img src={process.env.PUBLIC_URL + "/images/sample.jpeg"} className={classes.foodImg}/> 
                       {text.name}
                    </Grid>
                )): "" }
              </div>
            </Grid>

            <Grid container className={classes.contextFooter}>
              <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={handleClickOpen}>
                <AddIcon className={classes.add}/>
              </Fab>
              <Dialog open={open} onClose={handleClose}  aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Recipe Name</DialogTitle>
                <DialogContent>
                </DialogContent>
                  <TextField
                  autoFocus
                  margin="normal"
                  id="name"
                  type="recipe"
                  autoComplete="off"
                  />
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleAdd} color="primary">
                    Add
                  </Button>
                </DialogActions>
              </Dialog>

            </Grid>

          </Paper>
        </Grid>
        
      </Container>

    </div>
  );
}
