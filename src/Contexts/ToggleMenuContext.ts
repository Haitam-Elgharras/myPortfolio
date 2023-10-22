import { createContext } from "react";

interface ToggleMenuContextType {
  toggleMenu: () => void;
}

const ToggleMenuContext = createContext<ToggleMenuContextType>(
  {} as ToggleMenuContextType
);

export default ToggleMenuContext;
