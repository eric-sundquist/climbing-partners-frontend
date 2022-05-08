import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CreatePartnerAd from './CreatePartnerAd';

function PartnerAds() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography gutterBottom component="h2" variant="h4">
        Find climbing partners!
      </Typography>
      <CreatePartnerAd />
    </Box>
  );
}

export default PartnerAds;
