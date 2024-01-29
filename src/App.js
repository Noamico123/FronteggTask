import './App.css';
import { useEffect } from 'react';
import { useAuth, useLoginWithRedirect } from "@frontegg/react";
import Profile from './components/Profile.js';

function App() {
  const { isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  //redirect when the user is not loggedin
  useEffect(() => {
    if (!isAuthenticated) {
    loginWithRedirect();
      }
  }, [isAuthenticated, loginWithRedirect]);
  
  return (
    <div className="App">
      { isAuthenticated ? (
        <Profile/>
      ) : (
        <div>
          <button className='button' onClick={() => loginWithRedirect()}>Redirect To Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
