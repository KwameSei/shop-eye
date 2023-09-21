import React from "react";
import RequirementPredicate from "./RequirementPredicate";

function RequirementNot({ requirement }) {
  const isSatisfied = (credentials) => {
    return !requirement.isSatisfied(credentials);
  };

  return <RequirementPredicate isSatisfied={isSatisfied} />;
}

export default RequirementNot;
