import { useState, useEffect, useRef, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { io } from 'socket.io-client';
import ChatBubble from './ChatBubble';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';

/**
 * React function component. Renders chat component.
 *
 * @param {object} props - Props object for component.
 * @param {object} props.chat - the chat object.
 * @returns {ReactElement} - Chat component.
 */
function Chat({ chat }) {
  const { currentUser } = useAuth();
  const { userData, fetchFromApi } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [incomingMessage, setIncomingMessage] = useState(null);
  const socket = useRef();
  const scrollDownRef = useRef(null);

  // Connect to websocket and set up docket listeners. Runs on first render or when currentUser context has changed.
  useEffect(() => {
    const connectSocket = async () => {
      const token = await currentUser.getIdToken();
      socket.current = io(process.env.REACT_APP_CP_APP_API_URL, {
        auth: {
          token: token,
        },
      });

      socket.current.on('get-message', (data) => {
        setIncomingMessage({
          fromUser: data.senderUid,
          text: data.text,
          id: Math.ceil(Math.random() * 1000),
        });
      });

      socket.current.emit('add-user', currentUser.uid);
    };
    connectSocket();
  }, [currentUser]);

  // If socket recieves an incoming message and a chat with the sender of the incoming message is open -> update the message state with the new message.
  useEffect(() => {
    if (incomingMessage && chat?.users.some((user) => user.uid === incomingMessage.fromUser)) {
      setMessages((prev) => [...prev, incomingMessage]);
    }
  }, [incomingMessage, chat]);

  // Fetch messages for the active chat.
  useEffect(() => {
    const getMessages = async () => {
      const messagesData = await fetchFromApi(`/messages/${chat?.id}`, 'GET');
      setMessages(messagesData);
    };
    getMessages();
  }, [chat]);

  /**
   * Send a new message.
   *
   * @param {object} event - event triggered by pressing the send button.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = {
      chatId: chat.id,
      fromUser: userData.uid,
      text: newMessage,
    };

    // Send "send-message" event to socket
    const receivingUser = chat.users.find((user) => user.uid !== currentUser.uid);
    socket.current.emit('send-message', {
      senderUid: currentUser.uid,
      receiverUid: receivingUser.uid,
      text: newMessage,
    });

    // Post message to server
    const messageData = await fetchFromApi('/messages', 'POST', message);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage('');
  };

  /**
   * Updates state of newMessage.
   *
   * @param {object} event - event triggered by changing value of textfield
   */
  const handleChange = (event) => {
    setNewMessage(event.target.value);
  };

  // Scrolls window to the bottom of the chat when messages state is changed.
  useEffect(() => {
    scrollDownRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box
      sx={{
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          p: 1,
          flexGrow: 1,
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {messages.map((message) => (
          <ChatBubble
            refProp={scrollDownRef}
            text={message.text}
            currentUserUId={currentUser.uid}
            fromUserUId={message.fromUser}
            key={message.id}
          />
        ))}
      </Box>
      <Paper
        sx={{ minHeight: 80, display: 'flex', gap: 1, alignItems: 'center', p: 1 }}
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <TextField
          sx={{ flexGrow: 1 }}
          id="outlined-multiline-flexible"
          label="Send message"
          required
          fullWidth
          // multiline
          value={newMessage}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </Paper>
    </Box>
  );
}

export default Chat;
