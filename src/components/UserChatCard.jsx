import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import MessageIcon from '@mui/icons-material/Message';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function UserChatCard({ chat, userData, handleOpenChat }) {
  const otherUser = chat.users.filter((user) => user.uid !== userData.uid).pop();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar />}
        action={
          <Tooltip title="Open Chat">
            <IconButton
              aria-label="open chat"
              onClick={() => {
                handleOpenChat(chat);
              }}
            >
              <MessageIcon />
            </IconButton>
          </Tooltip>
        }
        title={otherUser.profile.name}
      />
    </Card>
  );
}

export default UserChatCard;
