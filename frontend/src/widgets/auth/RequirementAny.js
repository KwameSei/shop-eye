import React from "react";
import RequirementPredicate from "./RequirementPredicate";

function RequirementAny({ requirements }) {
  const isSatisfied = (credentials) => {
    return requirements.some((requirement) => requirement.isSatisfied(credentials));
  };

  return <RequirementPredicate isSatisfied={isSatisfied} />;
}

export default RequirementAny;
