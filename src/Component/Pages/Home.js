import React from "react";
import { Typography, Box, Grid, TextField, Button } from "@mui/material";
import { deepPurple, green } from "@mui/material/colors";
import List from "./Students/List";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";

const useStyle = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "white",
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "white",
  },
});

const Home = () => {
  const classes = useStyle();
  const [student, setStudent] = useState({
    stuname: "",
    email: "",
  });
  const [status, setStatus] = useState(false);

  function onTextChange(e) {
    setStudent({ ...student, [e.target.name]: e.target.value });
  }

  if (status) {
    return <Home />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3333/students`, student);
      setStatus(true);
    } catch (error) {
      console.log("Something is wrong");
    }
  }

  return (
    <>
      <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h2">React CRUD with API Call</Typography>
      </Box>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Add Student</Typography>
          </Box>

          {/* Input field code for User's Input  */}

          <form noValidate>
            {/* <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="id"
                  name="id"
                  variant="outlined"
                  required
                  fullWidth
                  id="id"
                  label="ID"
                  autoFocus
                />
              </Grid>
            </Grid> */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="outlined"
                  required
                  fullWidth
                  id="stuname"
                  label="Name"
                  onChange={(e) => onTextChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  onChange={(e) => onTextChange(e)}
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => handleSubmit(e)}
              >
                Add
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => handleSubmit(e)}
              >
                Add
              </Button>
            </Box>
          </form>
        </Grid>

        {/* Table for Student List  */}

        <Grid item md={6} xs={12}>
          <List />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
