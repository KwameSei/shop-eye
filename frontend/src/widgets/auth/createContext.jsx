import React, { createContext, useContext } from "react";

function generateToken(length) {
  const symbolSet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";

  for (let i = 0; i < length; i++) {
    const position = Math.floor(Math.random() * symbolSet.length);
    token += symbolSet.charAt(position);
  }

  return token;
}

let reservedToken = {};
function uniqueToken(length) {
  let token;
  do {
    token = generateToken(length);
  } while (reservedToken[token]);
  reservedToken[token] = true;
  return token;
}

function createCustomContext(defaultValue) {
  const TOKEN_LENGTH = 32;
  const token = uniqueToken(TOKEN_LENGTH);

  const CustomContext = createContext(defaultValue);

  function CustomProvider({ value, children }) {
    const contextValue = { [token]: value };
    return <CustomContext.Provider value={contextValue}>{children}</CustomContext.Provider>;
  }

  function CustomConsumer({ children }) {
    return (
      <CustomContext.Consumer>
        {(contextValue) => {
          if (!contextValue) {
            throw new Error("CustomConsumer used without a CustomProvider");
          }
          if (Array.isArray(children) || typeof children !== "function") {
            throw new TypeError("CustomConsumer expected exactly one function child");
          }
          return children(contextValue[token]);
        }}
      </CustomContext.Consumer>
    );
  }

  return { CustomProvider, CustomConsumer };
}

export default createCustomContext;
