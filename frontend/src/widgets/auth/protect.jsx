import React, { Component } from "react";
import RequirementProvider from "./RequirementProvider";
import { Guard } from "./Guard";

function protect(requirement) {
  if (!(requirement instanceof RequirementProvider)) {
    throw new TypeError("requirement is expected to be a Requirement instance");
  }

  return function withGuard(ComponentToProtect) {
    if (!ComponentToProtect.prototype || !(ComponentToProtect.prototype instanceof Component)) {
      throw new TypeError("Expected a class derived from React.Component");
    }

    function ProtectedComponent(props) {
      return (
        <Guard requirement={requirement}>
          <ComponentToProtect {...props}>{props.children}</ComponentToProtect>
        </Guard>
      );
    }

    return ProtectedComponent;
  };
}

export default protect;
