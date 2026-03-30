import React from "react";

const Protected = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div>
      {user.role === "admin" ? (
        children
      ) : (
        <h1>Forbidden: You don't have permission to access this page.</h1>
      )}
    </div>
  );
};

export default Protected;
