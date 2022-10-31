import React from "react";
import {
  makeStyles,
  Typography,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { orange } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const useStyle = makeStyles({
  stuListColor: {
    backgroundColor: orange[400],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const View = () => {
  const classes = useStyle();

  const { id } = useParams();
  const [student, setStudent] = useState([]);

  useEffect(() => {
    async function getAllStudent() {
      try {
        const student = await axios.get(`http://localhost:3333/students/${id}`);
        setStudent(student.data);
      } catch (error) {
        console.log("Something is wrong");
      }
    }
    getAllStudent();
  }, [id]);

  return (
    <>
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4">Student List</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              style={{ backgroundColor: "#616161" }}
              className={classes.tableHeadCell}
            >
              <TableCell align="center" className={classes.tableHeadCell}>
                ID
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Email
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{student.id}</TableCell>
              <TableCell align="center">{student.stuname}</TableCell>
              <TableCell align="center">{student.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box style={{ textAlign: "center", margin: "20px" }}>
        <NavLink to="/">
          <Button variant="contained" color="primary">
            Back To Home
          </Button>
        </NavLink>
      </Box>
    </>
  );
};

export default View;
