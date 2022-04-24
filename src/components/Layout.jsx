import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import ResponsiveAppBar from './ResponsiveAppBar';

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
        share across all the pages on your site, like navigation. */}
      <NavBar />
      {/* <br />
      <ResponsiveAppBar /> */}

      {/* An <Outlet> renders whatever child route is currently active,
        so you can think about this <Outlet> as a placeholder for
        the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default Layout;
