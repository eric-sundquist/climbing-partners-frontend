import { useEffect, useState, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import Container from '@mui/material/Container';
import { useLocation } from 'react-router-dom';
import PartnerAd from '../components/PartnerAd';
import Loading from '../components/Loading';
import { useUser } from '../contexts/UserContext';

/**
 * React functional component. Renders page with partners matching an ad.
 *
 * @returns {ReactElement} - the page component.
 */
function MatchingPartners() {
  const { date, location, adId } = useLocation().state;
  const { searchMatchingPartners } = useUser();
  const [matched, setMatched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches matching partners.
   */
  const getMatches = async () => {
    setMatched(await searchMatchingPartners(date, location));
    setIsLoading(false);
  };

  useEffect(() => {
    getMatches();
  }, []);

  return (
    <Container maxWidth="sm">
      {isLoading ? (
        <Loading />
      ) : (
        <Box sx={{ mt: 2, mb: 2 }}>
          {matched.length > 0 ? (
            <>
              <Typography id="transition-modal-title" gutterBottom variant="h4" component="h2">
                Matched climbers in {location}
              </Typography>
              <Typography variant="h6">{format(parseISO(date), 'PPPP')}</Typography>
            </>
          ) : (
            <Typography id="transition-modal-title" gutterBottom variant="h6" component="h2">
              There are no matching climbers
            </Typography>
          )}
          {matched.map((ad) => (
            <PartnerAd
              key={ad.id}
              id={ad.id}
              owner={ad.owner}
              date={ad.date}
              location={ad.location}
              description={ad.description}
              disciplines={ad.disciplines}
              equipment={ad.equipment}
              transport={ad.transport}
              currentUserAdId={adId}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}

export default MatchingPartners;
