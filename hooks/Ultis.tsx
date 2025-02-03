import { useState, useContext, createContext, ReactDOM, ReactNode } from "react"
import React from "react";

interface SharedStateContextType {
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
}

const SharedStateContext  = createContext<SharedStateContextType | undefined>(undefined)

export const SharedStateProvider = ({ children } : { children: ReactNode }) => {
  const [ state, setState ] = useState(-1);

  return (
    <SharedStateContext.Provider value={{ state, setState }}>
      {children}
    </SharedStateContext.Provider>
  );
};

export function useSharedState() {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error("useSharedState must be used within a SharedStateProvider");
  }
  return context;
}

