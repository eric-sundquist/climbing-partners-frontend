import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { io } from 'socket.io-client';
import ChatBubble from './ChatBubble';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';

function Chat({ chat }) {
  const { currentUser } = useAuth();
  const { userData, fetchFromApi } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [incomingMessage, setIncomingMessage] = useState(null);
  const socket = useRef();
  const scrollDownRef = useRef(null);

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

  useEffect(() => {
    if (incomingMessage && chat?.users.some((user) => user.uid === incomingMessage.fromUser)) {
      setMessages((prev) => [...prev, incomingMessage]);
    }
  }, [incomingMessage, chat]);

  useEffect(() => {
    const getMessages = async () => {
      const messagesData = await fetchFromApi(`/messages/${chat?.id}`, 'GET');
      setMessages(messagesData);
    };
    getMessages();
  }, [chat]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = {
      chatId: chat.id,
      fromUser: userData.uid,
      text: newMessage,
    };

    const messageData = await fetchFromApi('/messages', 'POST', message);
    setMessages((prev) => [...prev, messageData]);
    setNewMessage('');

    const receivingUser = chat.users.find((user) => user.uid !== currentUser.uid);
    socket.current.emit('send-message', {
      senderUid: currentUser.uid,
      receiverUid: receivingUser.uid,
      text: newMessage,
    });
  };

  const handleChange = (event) => {
    setNewMessage(event.target.value);
  };

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
