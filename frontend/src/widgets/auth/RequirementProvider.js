import { createContext, useContext } from "react";

const RequirementContext = createContext();

export function useRequirement() { // Use a distinct name for the hook
  const requirement = useContext(RequirementContext);

  if (!requirement) {
    throw new Error("useRequirement must be used within a RequirementProvider");
  }

  return requirement;
}

export function RequirementProvider({ children, requirement }) { // Use a distinct name for the component
  if (!(requirement instanceof Requirement)) {
    throw new Error("requirement must be an instance of Requirement");
  }

  return (
    <RequirementContext.Provider value={requirement}>
      {children}
    </RequirementContext.Provider>
  );
}

export default RequirementProvider;
