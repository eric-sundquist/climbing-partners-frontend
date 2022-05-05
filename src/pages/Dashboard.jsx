import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useUser } from '../contexts/UserContext';

function Dashboard() {
  const { userData } = useUser();
  return (
    <Container>
      <Typography component="h1" variant="h3">
        {userData.profile.name
          ? `Welcome ${userData.profile.name}!`
          : 'Welcome, please update your profile!'}
      </Typography>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio quaerat deleniti
        perferendis voluptatem ipsa alias, accusamus itaque iure? Ad maxime voluptatibus doloremque,
        perspiciatis reiciendis et incidunt delectus animi corrupti veritatis explicabo magnam earum
        quod? Tempora culpa fuga, architecto qui totam, sit, nobis consequatur eaque porro ipsa ex
        sunt assumenda corporis?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt reiciendis rerum
        temporibus ipsam maxime? Ipsam voluptatum nisi repudiandae dolorem numquam vitae nam quo
        cupiditate a explicabo expedita, debitis vero in!
      </p>
    </Container>
  );
}

export default Dashboard;
