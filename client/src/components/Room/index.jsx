import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate } from "react-router-dom";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ref, set, onValue, update } from "firebase/database";
import { db } from "../../utils/firebase";
import { useSelector } from "react-redux";
import Backdrop from "../commons/backdrop";

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [nameGroup, setNameGroup] = useState("");

  


  const activeUser = useSelector((state) => state?.app?.user?.email);

  const navigate = useNavigate();

  useEffect(() => {
    if (db) {
      onValue(ref(db, "rooms"), (snapshot) => {
        const data = snapshot.val();
        console.log({ data });
        if (data) {
          const rooms = Object.keys(data)
            ?.map((key) => ({
              ...(data[key] || {}),
              id: key,
            }))
            .slice(-20);
          setRooms(rooms);
        }
        setLoading(false);
      });
    }
  }, []);

  const addRoom = async () => {
    await set(ref(db, "rooms/" + uuidv4()), {
      name: nameGroup,
      createdAt: new Date(),
    });
    handleClose();
  };

  const handleClickOnRoom = ({ id }) => {
    navigate(`/chat?id=${id}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <List dense={true}>
        {rooms?.map(({ name, participants, id }, index) => (
          <ListItem key={index} onClick={() => handleClickOnRoom({ id })} style={{ cursor: 'pointer' }}> 
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText
              primary={name}
              secondary={`participants : ${
                (participants && Object.keys(participants)?.length) || 0
              }`}
            />
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name Group"
            type="text"
            fullWidth
            variant="standard"
            value={nameGroup}
            onChange={(event)=> setNameGroup(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addRoom}>Create</Button>
        </DialogActions>
        <Backdrop open={loading} />
      </Dialog>
      <div className={styles.iconButtonContainer}>
      <IconButton className={styles.iconButton} onClick={handleClickOpen}>
        <SpeedDialIcon />
      </IconButton>
      </div>
      <Backdrop open={loading} />
    </div>
  );
};

export default Room;
