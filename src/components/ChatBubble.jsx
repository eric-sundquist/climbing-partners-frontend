import { ReactElement, MutableRefObject } from 'react';
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

/**
 * React functional component. Renders a chat bubble.
 *
 * @param {object} props - Props object for component.
 * @param {string} props.text - Text to display.
 * @param {string} props.fromUserUId - user id of text/message sender.
 * @param {string} props.currentUserUId  - user id of current user.
 * @param {MutableRefObject} props.refProp - referense for element in component.
 * @returns {ReactElement} - Chat bubble component.
 */
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
