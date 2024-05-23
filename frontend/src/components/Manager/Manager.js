import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Cookies from "js-cookie";

import "../base.css";
import style from "./Manager.module.css";

const Manager = () => {
    const [data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newData, setNewData] = useState({
        id: "",
        siteName: "",
        email: "",
        password: "",
    });
    const [selectedDataIndex, setSelectedDataIndex] = useState(null);

    useEffect(() => {
        const token = Cookies.get("accessToken");
        console.log(token);
        if (token) {
            axios
                .get("http://localhost:5050/api/manager", {
                    headers: {
                        Authorization: `${token}`,
                    },
                })
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, []);

    const handleAddDataClick = () => {
        setOpenDialog(true);
        setNewData({ id: "", siteName: "", email: "", password: "" });
        setSelectedDataIndex(null);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleAddNewData = () => {
        const token = Cookies.get("accessToken");
        if (!newData.siteName || !newData.email || !newData.password) {
            return;
        }

        if (selectedDataIndex !== null) {
            const updatedData = [...data];
            updatedData[selectedDataIndex] = newData;
            axios
                .put(
                    "http://localhost:5050/api/manager",
                    {
                        id: updatedData[selectedDataIndex].id,
                        siteName: newData.siteName,
                        email: newData.email,
                        password: newData.password,
                    },
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                )
                .then(() => {
                    setData(updatedData);
                })
                .catch((error) => {
                    console.error("Error updating data:", error);
                });
        } else {
            axios
                .post(
                    "http://localhost:5050/api/manager",
                    {
                        siteName: newData.siteName,
                        email: newData.email,
                        password: newData.password,
                    },
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                )
                .then((response) => {
                    setData([...data, response.data]);
                })
                .catch((error) => {
                    console.error("Error adding data:", error);
                });
        }

        setOpenDialog(false);
    };

    const handleEditData = (index) => {
        setNewData({
            id: data[index]._id,
            siteName: data[index].siteName,
            email: data[index].email,
            password: data[index].password,
        });
        setSelectedDataIndex(index);
        setOpenDialog(true);
    };

    const handleDeleteData = (index) => {
        const token = Cookies.get("accessToken");
        const itemId = data[index]._id; 
        axios
            .delete(`http://localhost:5050/api/manager`, {
                headers: {
                    Authorization: `${token}`,
                },
                body : {
                    id : itemId
                }
            })
            .then(() => {
                const updatedData = [...data];
                updatedData.splice(index, 1);
                setData(updatedData);
            })
            .catch((error) => {
                console.error("Error deleting data:", error);
            });
    };

    const handleCopyBufferData = (index) => {
        const copyData = data[index];
        navigator.clipboard.writeText(`${copyData.password}`);
    };

    return (
        <div className="root">
            <Paper classes={{ root: style.root }}>
                <Typography classes={{ root: style.title }} variant="h5">
                    Manager
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Site</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.siteName}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell classes={{ root: style.btn }}>
                                        <Button
                                            variant="outlined"
                                            onClick={() =>
                                                handleEditData(index)
                                            }
                                            classes={style.buttonMargin}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={() =>
                                                handleDeleteData(index)
                                            }
                                            classes={style.buttonMargin}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            onClick={() =>
                                                handleCopyBufferData(index)
                                            }
                                            classes={style.buttonMargin}
                                        >
                                            Copy
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    size="large"
                    variant="contained"
                    fullWidth
                    onClick={handleAddDataClick}
                >
                    Add New Data
                </Button>
            </Paper>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>
                    {selectedDataIndex !== null ? "Edit Data" : "Add New Data"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="Sitename"
                        fullWidth
                        value={newData.siteName}
                        onChange={(e) =>
                            setNewData({ ...newData, siteName: e.target.value })
                        }
                        classes={{ root: style.inputMargin }}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={newData.email}
                        onChange={(e) =>
                            setNewData({ ...newData, email: e.target.value })
                        }
                        classes={{ root: style.inputMargin }}
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        value={newData.password}
                        onChange={(e) =>
                            setNewData({
                                ...newData,
                                password: e.target.value,
                            })
                        }
                        classes={{ root: style.inputMargin }}
                        type="password"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleAddNewData}>
                        {selectedDataIndex !== null ? "Save Changes" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Manager;
