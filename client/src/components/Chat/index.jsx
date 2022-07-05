import { useEffect, useRef, useState } from "react";

import { IconButton } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import "firebase/firestore";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import styles from "./index.module.scss";
import Chats from "./Chat";
import { useSelector } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Backdrop from "../commons/backdrop";
import { ref, set, onValue, update } from "firebase/database";
import { db } from "../../utils/firebase";
import { getParams } from "../../utils/navigation";
import dayjs from "dayjs";

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const Rooms = () => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const activeUser = useSelector((state) => state?.app?.user?.userName);

  const chatParentLower = useRef(null);
  const chatParentUpper = useRef(null);

  useEffect(() => {
    if (db) {
      const id = getIdParams();
      if (id) {
        updateRoom();
        onValue(ref(db, `chats/${id}`), (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const messages = Object.keys(data)
              ?.map((key) => ({
                ...(data[key] || {}),
                id: key,
              }))
              .slice(-20);
            const matchesByDate = messages.sort(
              (a, b) => dayjs.unix(b.date) - dayjs.unix(a.date)
            );
            console.log({ messages, matchesByDate });
            setChats(matchesByDate?.reverse());
            scroolToLower();
          }
          setLoading(false);
        });
      }
    }
  }, [activeUser]);

  const sumitData = async () => {
    if (message) {
      const id = getIdParams();
      await set(ref(db, `chats/${id}/${uuidv4()}`), {
        message: message,
        date: dayjs(new Date()).unix(),
        cate: "text",
        user: activeUser,
      });
      setMessage("");
      scroolToLower();
    }
  };

  const updateRoom = async () => {
    const id = getIdParams();
    await update(ref(db, `rooms/${id}/participants`), {
      [activeUser]: activeUser,
    });
  };

  const getIdParams = () => {
    const { id } = getParams();
    return id;
  };

  const scroolToLower = () => {
    const domNode = chatParentLower.current;
    if (domNode) {
      domNode.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scroolToUpper = () => {
    const domNode = chatParentUpper.current;
    if (domNode) {
      domNode.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      sumitData();
    }
  };

  return (
    <Container maxWidth="lg">
      <main className={styles.main}>
        <div ref={chatParentUpper} />
        {chats.map((el) => (
          <Chats
            styles={styles}
            chat={el}
            key={el.id}
            activeUser={activeUser}
          />
        ))}
        <div ref={chatParentLower} />
        <div>
          {!loading && chats?.length === 0 && (
            <span>No Message in this room</span>
          )}
        </div>
      </main>
      <div className={styles.formColLowerUpper}>
        <IconButton aria-label="delete" size="large" onClick={scroolToLower}>
          <ArrowDropDownIcon />
        </IconButton>
        <IconButton aria-label="delete" size="large" onClick={scroolToUpper}>
          <ArrowDropUpIcon />
        </IconButton>
      </div>
      <div className={`${styles.form}`}>
        <div className={styles.formCol}>
          <TextField
            id="outlined-textarea"
            placeholder="Say somthing.."
            variant="outlined"
            className={styles.textInput}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={onKeyDown}
            name="value"
            value={message}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            className={styles.textBtn}
            type="submit"
            onClick={sumitData}
          >
            Send
          </Button>
        </div>
      </div>
      <Backdrop open={loading} />
    </Container>
  );
};

export default Rooms;
