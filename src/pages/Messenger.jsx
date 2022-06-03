import { useState, useEffect, ReactElement } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';
import UserChatCard from '../components/UserChatCard';
import Chat from '../components/Chat';
import Loading from '../components/Loading';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';

/**
 * React functional component. Renders messenger page.
 *
 * @returns {ReactElement} - Messenger component
 */
function Messenger() {
  const [chats, setChats] = useState([]);
  const { fetchFromApi } = useAuth();
  const { userData } = useUser();
  const routerState = useLocation().state;
  const [currentChat, setCurrentChat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Creates a new chat.
   *
   * @param {string} withUserId - user id of the user to start chat with.
   */
  const createChat = async (withUserId) => {
    const newChatData = await fetchFromApi('/chats', 'POST', {
      fromUserId: userData.id,
      toUserId: withUserId,
    });

    setChats((prev) => [...prev, newChatData]);
    setCurrentChat(newChatData);
  };

  useEffect(() => {
    /**
     * Fetches current user chats from API. If redirected to messenger page with routerState open that chat if existing else create a new chat with that user.
     */
    const getChats = async () => {
      const chatData = await fetchFromApi(`/chats/${userData.id}`, 'GET');

      setChats(chatData);

      // Open chat with this user if routerState with userid present
      if (routerState) {
        const { withUserId } = routerState;
        const matchedChat = chatData
          .filter((chat) => chat.users.some((user) => user.id === withUserId))
          .pop();

        // If no existing chat, create new...
        if (!matchedChat) {
          createChat(withUserId);
        } else {
          // ...else open found chat
          setCurrentChat(matchedChat);
        }
      }
      setIsLoading(false);
    };
    getChats();
  }, []);

  /**
   * Opens selected chat.
   *
   * @param {object} chat - chat to open.
   */
  const handleOpenChat = (chat) => {
    setCurrentChat(chat);
  };

  if (isLoading) {
    return <Loading />;
  }

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
          You don't have any active conversations. Match with another climber to start a chat.
        </Typography>
      )}
    </Container>
  );
}

export default Messenger;
