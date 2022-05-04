import { Container } from '@mui/material';

function Dashboard({ id }) {
  return (
    <Container>
      <h1>This is the Dashboard</h1>
      <b>User in state is: {id}</b>
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
