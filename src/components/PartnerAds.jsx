import { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CreatePartnerAd from './CreatePartnerAd';
import OwnerPartnerAd from './OwnerPartnerAd';
import { useUser } from '../contexts/UserContext';

/**
 * React function component. Renders container for displaying current users partner ads.
 *
 * @returns {ReactElement} - PartnerAds component.
 */
function PartnerAds() {
  const { userData } = useUser();

  /**
   * Compares date with todays and returns truthy value of date is in the past.
   *
   * @param {string} dateIsoString - date to compare.
   * @returns {boolean} - Is date in the past? true/false
   */
  const dateIsInThePast = (dateIsoString) => {
    const date = new Date(dateIsoString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  return (
    <Box>
      <Typography gutterBottom component="h2" variant="h5">
        Find climbing partners!
      </Typography>
      <CreatePartnerAd />

      {userData.ads.length > 0 && (
        <Stack sx={{ mt: 3 }} spacing={2}>
          <Typography variant="h6">Active partner searches:</Typography>
          {userData.ads
            .filter((ad) => !dateIsInThePast(ad.date))
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((ad) => (
              <OwnerPartnerAd
                key={ad.id}
                id={ad.id}
                date={ad.date}
                location={ad.location}
                description={ad.description}
                disciplines={ad.disciplines}
                equipment={ad.equipment}
                transport={ad.transport}
              />
            ))}
        </Stack>
      )}
    </Box>
  );
}

export default PartnerAds;
