import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const ownMessageStyle = {
  maxWidth: '80%',
  p: 1,
  bgcolor: '#1976d2',
  color: '#fff',
  alignSelf: 'flex-end',
};

const otherMessageStyle = {
  maxWidth: '80%',
  p: 1,
  alignSelf: 'flex-start',
};

function ChatBubble({ text, fromUserUId, currentUserUId }) {
  const isOwnMessage = fromUserUId === currentUserUId;
  return (
    <Paper sx={isOwnMessage ? ownMessageStyle : otherMessageStyle}>
      <Typography variant="body1" color="inherit">
        {text}
      </Typography>
    </Paper>
  );
}

export default ChatBubble;
