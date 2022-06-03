import { ReactElement } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

/**
 * React functional component. Renders a discipline card.
 *
 * @param {object} props - Props object for component.
 * @param {number} props.index - index of discipline in disciplines array.
 * @param {string} props.discipline - name of discipline.
 * @param {string} props.grade - grade for discipline.
 * @param {boolean} props.isEditing - is the card editable.
 * @param {Function} props.removeDiscipline - function sendt down by parent to remove discipline.
 * @returns {ReactElement} - The discipline card.
 */
function Discipline({ index, discipline, grade, isEditing, removeDiscipline }) {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {discipline}
        </Typography>
        <Typography variant="body2">{grade}</Typography>

        {isEditing && (
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={() => {
                removeDiscipline(index);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </CardContent>
    </Card>
  );
}

export default Discipline;
