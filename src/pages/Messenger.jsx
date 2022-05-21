import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import UserChatCard from '../components/UserChatCard';
import Chat from '../components/Chat';
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
      const res = await fetch(`${process.env.REACT_APP_CP_APP_API_URL}/chats/${userData.id}`, {
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
      // console.log('get chats:');
      // console.log(chatData);

      setChats(chatData);

      // Open chat with this user if withUserId present
      if (routerState) {
        const { withUserId } = routerState;
        const matchedChat = chatData
          .filter((chat) => chat.users.some((user) => user.id === withUserId))
          .pop();
        if (!matchedChat) {
          console.log('creating chat');
          // Create a chat with user
          createChat(withUserId);
        } else {
          console.log('found chat');
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
      {chats.length > 0 ? (
        <Grid marginTop={1} marginBottom={2} container spacing={3}>
          <Grid item xs={12} md={3}>
            <Stack spacing={2}>
              {chats.map((chat) => (
                <UserChatCard
                  handleOpenChat={handleOpenChat}
                  key={chat.id}
                  chat={chat}
                  currentChat={currentChat}
                  userData={userData}
                />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={9}>
            {currentChat ? (
              <Chat chat={currentChat} user={userData} />
            ) : (
              <Typography variant="h6" color="initial">
                Choose a chat in the chat menu
              </Typography>
            )}
          </Grid>
        </Grid>
      ) : (
        <Typography marginTop={5} variant="h5" color="initial">
          You got no active chats with any user. Start a chat with a user and you will find them
          here.
        </Typography>
      )}
    </Container>
  );
}

export default Messenger;
