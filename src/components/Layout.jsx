import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';

function Layout() {
  return (
    <div>
      <ResponsiveAppBar />

      {/* An <Outlet> renders whatever child route is currently active,
        so you can think about this <Outlet> as a placeholder for
        the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

export default Layout;
