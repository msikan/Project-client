import { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { IconButton } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import "firebase/firestore";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import styles from "./index.module.scss";
import Chats from "./Chat";
import { useSelector } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Backdrop from "../commons/backdrop";
var firebaseConfig = {
  apiKey: "AIzaSyA34Lo7QhlbVKB3OIcrE2PKoqesDAs4QYU",
  authDomain: "mahon-lev.firebaseapp.com",
  projectId: "mahon-lev",
  storageBucket: "mahon-lev.appspot.com",
  messagingSenderId: "634141257862",
  appId: "1:634141257862:web:e04cd100f9d59c2e166107",
  databaseURL: "https://mahon-lev-default-rtdb.firebaseio.com",
};
// Initialize Firebase
let app, db;

app = initializeApp(firebaseConfig);
db = getDatabase(app);

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const Rooms = () => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [loading,setLoading] = useState(true);

  const activeUser = useSelector((state) => state?.app?.user?.email);

  const chatParentLower = useRef(null);
  const chatParentUpper = useRef(null);


  useEffect(() => {
    if (db) {
      onValue(ref(db, "chats"), (snapshot) => {
        const data = snapshot.val();
        console.log({ data });
        if (data) {
          const messages = Object.keys(data)
            ?.map((key) => ({
              ...(data[key] || {}),
              id: key,
            }))
            .slice(-20);
          setChats(messages);
          scroolToLower();
        }
        setLoading(false);
      });
    }
  }, []);

  const sumitData = async () => {
    if (message) {
      await set(ref(db, "chats/" + uuidv4()), {
        message: message,
        createdAt: new Date(),
        cate: "text",
        user: activeUser,
      });
      setMessage("");
      scroolToLower();
    }
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
  }

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
          {!loading && chats?.length === 0 && <span>No Message in this room</span>}
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

// class Rooms extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeUser: this.props.activeUser,
//       value: "",
//       isRecording: false,
//       chats: [],
//       Error: null,
//     //   recordState: null,
//       audio: null
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   componentDidMount() {
//     if (db) {
//         onValue(ref(db, 'chats'), (snapshot) => {
//         const data = snapshot.val();
//         console.log({ data });
//         const messages = Object.keys(data)?.map(key => ({
//             ...(data[key] || {}),
//             id: key
//         }))
//         this.setState({ chats:  messages});
//         });
//     //   db.collection("chats")
//     //     .orderBy("createdAt")
//     //     .onSnapshot((querySnapShot) => {
//     //       const chats = querySnapShot.docs.map((docs) => ({
//     //         ...docs.data(),
//     //         id: docs.id
//     //       })) ;
//     //       this.setState({ chats });
//     //     });
//     }

//   }
//   handleChange(e) {
//     this.setState({ value: e.target.value });
//   }
//   async sumitData(msg, cate) {
//     // await db.collection("chats")?.add({
//     //   message: msg,
//     //   createdAt: db.FieldValue.serverTimestamp(),
//     //   user: this.state.activeUser,
//     //   cate: cate
//     // });
//     await set(ref(db, 'chats/' + new Date()), {
//        message: msg,
//        createdAt: new Date(),
//        cate: cate
//     });
//   }
//   async handleSubmit(e) {
//     e.preventDefault();
//     const { value } = this.state;
//     try {
//       await this.sumitData(value, "text");
//       this.setState({ value: "" });
//     } catch (error) {
//       console.log(error);
//       this.setState({ Error: error.message });
//     }
//   }

//   start = () => {
//     this.setState({
//     //   recordState: RecordState.START,
//       isRecording: !this.state.isRecording
//     });
//   };

//   stop = () => {
//     this.setState({
//     //   recordState: RecordState.STOP,
//       isRecording: !this.state.isRecording
//     });
//   };

//   //audioData contains blob and blobUrl
//   onStop = async (audioData) => {
//     console.log(audioData);
//     try {
//       await this.sumitData(audioData, "voice");
//     } catch (error) {
//       console.log(error);
//       this.setState({ Error: error.message });
//     }
//   };
//   render() {
//     // const { recordState } = this.state;
//     return (
//       <Container maxWidth="lg">
//         <AppBar position="absolute">
//           <Toolbar className={styles.navRow}>
//             <Typography component="h1" variant="h6" color="inherit" noWrap>
//               Real Chat
//             </Typography>

//             {/* Loggout Component */}
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={this.props.handleLogout}
//             >
//               Logout
//             </Button>
//           </Toolbar>
//         </AppBar>
//         <main className={styles.main}>
//           {this.state.chats.map((el) => (
//             <Chats
//               styles={styles}
//               chat={el}
//               key={el.id}
//               activeUser={this.props.activeUser}
//             />
//           ))}
//         </main>
//         <form
//           className={`${styles.form}`}
//           noValidate
//           autoComplete="off"
//           onSubmit={this.handleSubmit}
//         >
//           <div className={styles.formCol}>
//             <TextField
//               id="outlined-textarea"
//               placeholder="Say somthing.."
//               multiline
//               variant="outlined"
//               className={styles.text}
//               onChange={this.handleChange}
//               name="value"
//             />
//             {this.state.isRecording ? (
//               <MicOffIcon className={styles.mic} onClick={this.stop} />
//             ) : (
//               <MicIcon className={styles.mic} onClick={this.start} />
//             )}
//             <Button
//               variant="contained"
//               color="primary"
//               className={styles.textBtn}
//               type="submit"
//               onClick={this.handleSubmit}
//             >
//               Send
//             </Button>
//           </div>
//         </form>
//         <div>
//           {/* <AudioReactRecorder
//             state={recordState}
//             onStop={this.onStop}
//             canvasWidth="0"
//             canvasHeight="0"
//           /> */}
//           );
//         </div>
//       </Container>
//     );
//   }
// }

export default Rooms;
