import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Disciplines from './Disciplines';
import { useUser } from '../contexts/UserContext';

function PartnerAd({ date, location, description, disciplines, equipment, transport, owner }) {
  return (
    <Card sx={{ mt: 2 }}>
      <CardHeader
        avatar={<Avatar />}
        title={owner.profile.name}
        titleTypographyProps={{ variant: 'h6' }}
      />

      <CardContent>
        <Typography gutterBottom variant="h6">
          Description:
        </Typography>
        <Typography gutterBottom variant="body1">
          {description}
        </Typography>
        <Typography gutterBottom variant="h6">
          Disciplines:
        </Typography>
        <Box>{disciplines.length > 0 && <Disciplines disciplines={disciplines} />}</Box>
        <Typography gutterBottom variant="h6">
          Other:
        </Typography>
        {equipment && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckIcon />
            <Typography variant="body1" color="initial">
              Equipment
            </Typography>
          </Box>
        )}

        {transport && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckIcon />
            <Typography variant="body1" color="initial">
              Transport
            </Typography>
          </Box>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="text" color="primary">
          View profile
        </Button>
        <Button variant="text" color="primary">
          Send invite
        </Button>
        <Button variant="text" color="primary">
          Send Message
        </Button>
      </CardActions>
    </Card>
  );
}

export default PartnerAd;
