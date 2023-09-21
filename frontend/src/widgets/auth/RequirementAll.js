import React from 'react';
import RequirementPredicate from './RequirementPredicate';

const RequirementAll = ({ requirements }) => {
  const isSatisfied = (credentials) => {
    return requirements.every((requirement) => requirement.isSatisfied(credentials));
    };

  return (
    <RequirementPredicate isSatisfied={isSatisfied} />
  );
};

export default RequirementAll;