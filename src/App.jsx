import SignUp from './components/SignUp';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <SignUp />;
    </AuthProvider>
  );
}

export default App;
