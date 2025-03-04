import React from "react";

function layout({ children }) {
  return (
    <>
      <h1>This is Admin Header</h1>
      {children}
      <h1>This is Admin Header</h1>
    </>
  );
}

export default layout;
