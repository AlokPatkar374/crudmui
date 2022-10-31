import React from "react";
import { Typography, Box, Grid, TextField, Button } from "@mui/material";
import { deepPurple, green } from "@mui/material/colors";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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

const Edit = () => {
  const classes = useStyle();
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    stuname: "",
    email: "",
  });

  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(`http://localhost:3333/students/${id}`);
        setStudent(student.data);
      } catch (error) {
        console.log("Something is wrong");
      }
    }
    getStudent();
  }, [id]);

  function onTextChange(e) {
    setStudent({ ...student, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3333/students/${id}`, student);
      navigate("/");
    } catch (error) {
      console.log("Something is wrong");
    }
  }
  return (
    <>
      <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h2">React CRUD with API Call</Typography>
      </Box>
      <Grid container justifyContent="center" spacing={0} alignItems="center" direction="column">
        <Grid item md={6} xs={12} >
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Edit Student</Typography>
          </Box>

          {/* Input field code for User's Input  */}

          <form noValidate>
            <Grid container spacing={2}>
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
                  value={id}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="outlined"
                  required
                  fullWidth
                  id="stuname"
                  label="Name"
                  value={student.stuname}
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
                  value={student.email}
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
                Update
              </Button>
            </Box>
          </form>
        </Grid>

        {/* Table for Student List  */}

        <Grid item md={6} xs={12}></Grid>
        <Box style={{ textAlign: "center", margin: "20px" }}>
          <NavLink to="/">
            <Button variant="contained" color="primary">
              Back To Home
            </Button>
          </NavLink>
        </Box>
      </Grid>
    </>
  );
};

export default Edit;
