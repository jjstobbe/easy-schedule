import React from 'react';
import './index.css';

const Login = () => {

  return (
    <a className="google-btn" href="/auth/google">
      <div className="google-icon-wrapper">
        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
      </div>
      <p className="btn-text"><b>Sign in with google</b></p>
    </a>
  );
}

export default Login;
