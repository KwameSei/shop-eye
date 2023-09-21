import React from "react";
import RequirementProvider from "./RequirementProvider";

function RequirementPredicate({ requirements }) {
  if (requirements.length === 0) {
    throw new Error("No requirement has been provided");
  }

  if (requirements.some((r) => !(r instanceof RequirementProvider))) {
    throw new Error("Requirements are expected to be instances of 'Requirement'");
  }

  const isSatisfied = (credentials) => {
    return requirements.every((requirement) => requirement.isSatisfied(credentials));
  };

  return isSatisfied;
}

export default RequirementPredicate;
