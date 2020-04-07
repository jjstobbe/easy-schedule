import React from "react";
import * as assetManifest from "../build/asset-manifest.json";

const Container = (props) => {
  const cssFileName = assetManifest.files["main.css"].split("/").slice(-1);

  return (
    <html lang="en">
      <head>
        <title>Hello FROM JSX CONTAINER</title>
        <link href={cssFileName} rel="stylesheet" />
      </head>
      <body>
        <div id="app">{props.children}</div>
      </body>
    </html>
  );
};

export default Container;
