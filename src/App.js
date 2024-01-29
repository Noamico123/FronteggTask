import './App.css';
import { useEffect } from 'react';
import { useAuth, useLoginWithRedirect, ContextHolder, AdminPortal, useAuthActions } from "@frontegg/react";

function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();
  const { switchTenant } = useAuthActions();

  //redirect when the user is not loggedin
  useEffect(() => {
    if (!isAuthenticated) {
    loginWithRedirect();
      }
  }, [isAuthenticated, loginWithRedirect]);
  
  //Divider line (design)
  const Divider = () => {
    return (
        <hr style={{ borderBottom: "1px dotted lightgrey",width: "100%"}}/>
    );
  };

  //logout button
  const handleLogout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  //settings button
  const handleAdminPortalClick = () => {
    AdminPortal.show()
  }

  // switch user button
  const handleSwitchTenant = (tenantId) => {
    switchTenant({ tenantId });
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
          <select className='button' value={user?.tenantId} onChange={e => handleSwitchTenant(e.target.value)}>
            <option disabled>Select Tenant</option>
            {user.tenantIds.map(tenantId => (
              <option key={tenantId} value={tenantId}>
                {tenantId}
              </option>
            ))}
          </select>

          <div>
            <button className='button' onClick={() => alert(user.accessToken)}>View Token</button>
          </div>
          <div>
            <button className='button' onClick={() => handleAdminPortalClick()}>Settings</button>
          </div>
          <div>
            <button className='button' onClick={() => handleLogout()}>Logout</button>
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
