import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';

import { Typography } from '@mui/material';
import UserChatCard from '../components/UserChatCard';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';

function Messenger() {
  const [chats, setChats] = useState([]);

  const { currentUser } = useAuth();
  const { userData } = useUser();
  const routerState = useLocation().state;

  const [currentChat, setCurrentChat] = useState(null);

  const createChat = async (withUserId) => {
    const token = await currentUser.getIdToken();
    const res = await fetch(`${process.env.REACT_APP_CP_APP_API_URL}/chats`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ fromUserId: userData.id, toUserId: withUserId }),
    });

    if (!res.ok) {
      // TODO
      // THROW ERROR, Pick up in error boudary???
      console.log(res.status);
      console.log(res.statusText);
      console.log(await res.json());
      throw new Error(res.status);
    }
    // set chats
    const newChatData = await res.json();

    setChats((prev) => [...prev, newChatData]);
    setCurrentChat(newChatData);
  };

  useEffect(() => {
    const getChats = async () => {
      const token = await currentUser.getIdToken();
      const res = await fetch(`${process.env.REACT_APP_CP_APP_API_URL}/chats/${currentUser.uid}`, {
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

      const chatData = await res.json();
      setChats(chatData);

      // Open chat with this user if withUserId present
      if (routerState) {
        const { withUserId } = routerState;
        const matchedChat = chatData
          .filter((chat) => chat.users.some((user) => user.id === withUserId))
          .pop();
        if (!matchedChat) {
          // Create a chat with user
          createChat(withUserId);
        } else {
          setCurrentChat(matchedChat);
        }
      }
    };
    getChats();
  }, []);

  const handleOpenChat = (chat) => {
    setCurrentChat(chat);
  };

  console.log('Before Render!');
  console.log(chats);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            {chats.map((chat) => (
              <UserChatCard
                handleOpenChat={handleOpenChat}
                key={chat.id}
                chat={chat}
                userData={userData}
              />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          {currentChat ? (
            <Box>
              <CardHeader avatar={<Avatar />} title={currentChat.users[1].profile.name} />
              <Box>
                <Typography variant="h1 " color="text.secondary">
                  Chat bubblor med mere...
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="h6" color="initial">
              Choose a chat in the chat menu
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Messenger;
