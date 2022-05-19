import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ChatBubble from './ChatBubble';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';

function Chat({ chat }) {
  const { currentUser } = useAuth();
  const { userData } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const getMessages = async () => {
      const token = await currentUser.getIdToken();
      const res = await fetch(`${process.env.REACT_APP_CP_APP_API_URL}/messages/${chat?.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        // THROW ERROR, Pick up in error boudary???
        console.log(res.status);
        console.log(res.statusText);
        console.log(await res.json());
        throw new Error(res.status);
      }

      const messagesData = await res.json();
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

    // const toUserID = chat.users.find((user) => user !== userData.id);
    const token = await currentUser.getIdToken();
    const res = await fetch(`${process.env.REACT_APP_CP_APP_API_URL}/messages`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!res.ok) {
      // THROW ERROR, Pick up in error boudary???
      console.log(res.status);
      console.log(res.statusText);
      console.log(await res.json());
      throw new Error(res.status);
    }

    const messageData = await res.json();
    setMessages((prev) => [...prev, messageData]);
    setNewMessage('');
  };

  const handleChange = (event) => {
    setNewMessage(event.target.value);
  };
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
