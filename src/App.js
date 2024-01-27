import './App.css';
import { useEffect } from 'react';
import { useAuth, useLoginWithRedirect, ContextHolder, AdminPortal } from "@frontegg/react";

function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  // Uncomment this to redirect to login automatically
  useEffect(() => {
    if (!isAuthenticated) {
  loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  const Divider = () => {
    return (
        <hr
            style={{ borderBottom: "1px dotted lightgrey",width: "100%"}}
        ></hr>
    );
  };
  

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const handleClick = () => {
    AdminPortal.show()
  }

  return (
    <div className="App">
      { isAuthenticated ? (
        <div className='card'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img className='card-img' src={user?.profilePictureUrl} alt={user?.name}/>
            <span className='card-name'>Hi {user?.name}</span>
          </div>
          <Divider />
          <div>
            <button className='button' onClick={() => alert(user.accessToken)}>View Token</button>
          </div>
          <div>
            <button className='button' onClick={() => handleClick()}>Settings</button>
          </div>
          <div>
            <button className='button' onClick={() => logout()}>Logout</button>
          </div>
          

          
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Click me to login</button>
        </div>
      )}
    </div>
  );
}

export default App;
