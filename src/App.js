import React from 'react';
import './App.css';
import { GoogleLogin } from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

const App = () => {
  console.log("Rendering App");

  return (
    <div className="App">
      <GoogleLogin
        clientId="CLIENT_ID"
        buttonText="Sign in using Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        responseType={'code'}
        scope={'https://www.googleapis.com/auth/calendar.events'}
      />
    </div>
  );
}

export default App;
