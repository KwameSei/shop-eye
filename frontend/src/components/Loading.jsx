import React, { createContext, useContext, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

// Create a context to manage the loading state
const LoadingContext = createContext();

// Custom hook to use the loading context
export const useLoading = () => {
  return useContext(LoadingContext);
};

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  const value = {
    loading,
    showLoading,
    hideLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <Backdrop
        open={loading}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
