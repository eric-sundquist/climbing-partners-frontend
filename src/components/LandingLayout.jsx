import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function LandingLayout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
        share across all the pages on your site, like navigation. */}
      <NavBar />

      <Outlet />
    </div>
  );
}

export default LandingLayout;
