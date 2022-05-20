import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import MessageIcon from '@mui/icons-material/Message';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

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
