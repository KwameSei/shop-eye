import React, { useContext } from "react";
import createCustomContext from "./createContext.jsx";
import RequirementProvider from "./RequirementProvider";

const { Consumer, Provider } = createCustomContext();

function Guard({ requirement, children }) {
  if (!(requirement instanceof RequirementProvider)) {
    throw new TypeError("requirement is expected to be Requirement instance");
  }

  const credentials = useContext(Consumer);

  return requirement.isSatisfied(credentials) ? children : null;
}

export { Guard };
