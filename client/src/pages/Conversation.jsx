import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BsFillChatFill } from "react-icons/bs";
import Message from "../components/Message";
import axios from "axios";
import { io } from "socket.io-client";
import { getMess, createMess } from "../features/message/messageSlice";
import {
  getThisConv,
  createConv,
} from "../features/conversation/conversationSlice";

function Conversation() {
  const firstId = useParams().firstId;
  const secondId = useParams().secondId;

  const [convId, setConvId] = useState("");
  const [chat, setChat] = useState({});
  const [usernameSecond, setUsernameSecond] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageToSocket, setMessageToSocket] = useState(null);
  const socket = useRef();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const scrollRef = useRef();

  const fetchUser = async () => {
    const config = {
      headers: {
        token: "Bearer " + user.token,
      },
    };

    const res = await axios.get(
      `http://localhost:8080/api/users/${secondId}`,
      config
    );

    return res.data;
  };

  useEffect(() => {
    fetchUser().then((res) => setUsernameSecond(`${res.name} ${res.surname}`));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.current = io("ws://localhost:9000");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
  }, [user._id]);

  useEffect(() => {
    socket.current.on("getMessage", (msg) => {
      setMessageToSocket({
        sender: msg.senderId,
        text: msg.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    messageToSocket &&
      chat?.members.includes(messageToSocket.sender) &&
      setMessages((prev) => [...prev, messageToSocket]);
  }, [messageToSocket, chat]);

  useEffect(() => {
    dispatch(getThisConv([firstId, secondId]))
      .unwrap()
      .then((res) => {
        setChat(res);
        setConvId(res._id);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          dispatch(createConv([firstId, secondId]))
            .unwrap()
            .then((res) => {
              setChat(res);
              setConvId(res._id);
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          alert(error);
        }
      });
  }, [firstId, secondId, dispatch]);

  useEffect(() => {
    if (convId) {
      dispatch(getMess(convId))
        .unwrap()
        .then((res) => setMessages(res))
        .catch((error) => {
          alert(error);
        });
    }
  }, [dispatch, convId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageToSend = {
      sender: user._id,
      text: newMessage,
      convId: convId,
    };

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: secondId,
      text: newMessage,
    });

    dispatch(createMess(messageToSend))
      .unwrap()
      .then((res) => {
        setMessages([...messages, res]);
        setNewMessage("");
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <section className="heading">
        <h1>
          <BsFillChatFill /> Chat with {usernameSecond}
        </h1>
      </section>

      <div className="chatBox">
        <div className="chatBoxInside">
          <div className="chatBoxTop">
            {messages.map((m) => (
              <div ref={scrollRef} key={m._id}>
                <Message message={m} bool={m.sender === user._id} key={m._id} />
              </div>
            ))}
          </div>
          <div className="chatBoxBottom">
            <textarea
              placeholder="write something..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
            <button onClick={handleSubmit} className="btn">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
