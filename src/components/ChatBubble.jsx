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

function ChatBubble({ text, fromUserUId, currentUserUId, refProp }) {
  const isOwnMessage = fromUserUId === currentUserUId;
  return (
    <Paper sx={isOwnMessage ? ownMessageStyle : otherMessageStyle}>
      <div ref={refProp}>
        <Typography variant="body1" color="inherit">
          {text}
        </Typography>
      </div>
    </Paper>
  );
}

export default ChatBubble;
