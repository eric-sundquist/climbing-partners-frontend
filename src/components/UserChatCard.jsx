import { ReactElement } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import MessageIcon from '@mui/icons-material/Message';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

/**
 * React functional component. Renders chat component.
 *
 * @param {object} props - Props object for component.
 * @param {object} props.chat - the chat object.
 * @param {object} props.currentChat - the current chat.
 * @param {object} props.userData - the current user.
 * @param {Function} props.handleOpenChat - function for opening a chat.
 * @returns {ReactElement} - UserChatCard component.
 */
function UserChatCard({ chat, currentChat, userData, handleOpenChat }) {
  const isCurrentChat = chat.id === currentChat?.id;
  const otherUser = chat.users.find((user) => user.uid !== userData.uid);

  return (
    <Card sx={isCurrentChat ? { bgcolor: '#1976d2', color: 'white' } : {}}>
      <CardHeader
        avatar={<Avatar />}
        action={
          <Tooltip title="Open Chat">
            <IconButton
              aria-label="open chat"
              color="inherit"
              onClick={() => {
                handleOpenChat(chat);
              }}
            >
              <MessageIcon />
            </IconButton>
          </Tooltip>
        }
        title={otherUser.profile.name}
        titleTypographyProps={{ color: 'inherit' }}
      />
    </Card>
  );
}

export default UserChatCard;
