import React, { createContext, useContext } from "react";

// Create a context for the credentials
const CredentialsContext = createContext();

// Credentials provider component
function CredentialsProvider({ children, credentials }) {
  return (
    <CredentialsContext.Provider value={credentials}>
      {children}
    </CredentialsContext.Provider>
  );
}

// Custom hook to access credentials
function useCredentials() {
  const credentials = useContext(CredentialsContext);
  return credentials;
}

// Define your requirements
const NeedAdmin = "admin";
const NeedStaff = "staff";

export { CredentialsProvider, useCredentials, NeedAdmin, NeedStaff };
