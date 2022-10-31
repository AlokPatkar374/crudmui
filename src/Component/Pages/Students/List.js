import React from "react";
import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

const List = () => {
  const classes = useStyle();
  const [students, setStudents] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    async function getAllStudent() {
      try {
        const students = await axios.get("http://localhost:3333/students");
        setStudents(students.data);
      } catch (error) {
        console.log("Something is wrong");
      }
    }
    getAllStudent();
  }, []);

  const handleCloseYes = async () => {
    await axios.delete(`http://localhost:3333/students/${id}`);
    var newStudent = students.filter((item) => {
      return item.id !== id;
    });
    setStudents(newStudent);
    setOpen(false);
  };

  // this is modal box

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                No
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Email
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center">{item.stuname}</TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton>
                        <Link to={`/view/${item.id}`}>
                          <VisibilityIcon color="primary" />
                        </Link>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton>
                        <Link to={`/edit/${item.id}`}>
                          <EditIcon />
                        </Link>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      {/* <IconButton onClick={() => handleDelete(item.id)}> */}
                      <IconButton onClick={() => handleClickOpen(item.id)}>
                        <Link>
                          <DeleteIcon color="error" />
                        </Link>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}

            <>
              {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open alert dialog
              </Button> */}
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete Item"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this data?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>No</Button>
                  <Button onClick={() => handleCloseYes()} autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default List;
