import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function Discipline({ index, discipline, grade, isEditing, removeDiscipline }) {
  return (
    <Card sx={{ minWidth: 100 }}>
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
