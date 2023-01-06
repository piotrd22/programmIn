import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BsFillChatFill } from "react-icons/bs";
import Message from "../components/Message";
import axios from "axios";
import { getMess, createMess } from "../features/message/messageSlice";
import {
  getThisConv,
  createConv,
} from "../features/conversation/conversationSlice";

function Conversation() {
  const firstId = useParams().firstId;
  const secondId = useParams().secondId;

  const [convId, setConvId] = useState("");
  const [usernameSecond, setUsernameSecond] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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
    dispatch(getThisConv([firstId, secondId]))
      .unwrap()
      .then((res) => setConvId(res._id))
      .catch((error) => {
        if (error.response.status === 404) {
          dispatch(createConv([firstId, secondId]))
            .unwrap()
            .then((res) => setConvId(res._id))
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
