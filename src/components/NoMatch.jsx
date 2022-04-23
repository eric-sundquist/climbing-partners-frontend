import { Link } from 'react-router-dom';

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>The url you are trying to visit doesnt exist.</p>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default NoMatch;
