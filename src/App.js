import React from 'react';
import './App.css';

const App = () => {
  console.log("Rendering App");

  return (
    <div className="App">
      <a href="/auth/google" >
        Login with google
      </a>
    </div>
  );
}

export default App;
