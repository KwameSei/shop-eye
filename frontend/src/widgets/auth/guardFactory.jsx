import React from "react";
import RequirementProvider from "./RequirementProvider";
import { Guard } from "./Guard";

function GuardFactory({ requirement, children }) {
  if (!(requirement instanceof RequirementProvider)) {
    throw new TypeError("requirement is expected to be a Requirement instance");
  }

  return <Guard requirement={requirement}>{children}</Guard>;
}

export default GuardFactory;
