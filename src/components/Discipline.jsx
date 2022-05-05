import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function Discipline({ discipline, grade, isEditable }) {
  return (
    <Card sx={{ minWidth: 100 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {discipline}
        </Typography>
        <Typography variant="body2">{grade}</Typography>

        {isEditable && (
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
}

export default Discipline;
