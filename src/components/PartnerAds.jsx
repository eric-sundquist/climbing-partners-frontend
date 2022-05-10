import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CreatePartnerAd from './CreatePartnerAd';
import OwnerPartnerAd from './123OwnerPartnerAd';
import { useUser } from '../contexts/UserContext';

function PartnerAds() {
  const { userData } = useUser();
  console.log(userData.ads);
  return (
    <Box sx={{ p: 2 }}>
      <Typography gutterBottom component="h2" variant="h4">
        Find climbing partners!
      </Typography>
      <CreatePartnerAd />
      <Box marginTop={2}>
        <Typography gutterBottom component="h4" variant="h6">
          Your current searches:
        </Typography>
        {userData.ads.map((ad) => (
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
      </Box>
    </Box>
  );
}

export default PartnerAds;