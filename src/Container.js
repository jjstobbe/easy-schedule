import React from 'react';

const Container = (props) =>
  <html lang="en">
    <head>
      <title>Hello Container</title>
    </head>
    <body>
      <div id="app">
        {props.children}
      </div>
    </body>
  </html>;

export default Container;
