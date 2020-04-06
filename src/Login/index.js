import React from 'react';
import './index.css';

const Login = () => {
  
  return (
    <a class="google-btn" href="/auth/google">
      <div class="google-icon-wrapper">
        <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
      </div>
      <p class="btn-text"><b>Sign in with google</b></p>
    </a>
  );
}

export default Login;
