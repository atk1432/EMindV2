import { useState, useContext, createContext, ReactDOM, ReactNode } from "react"
import React from "react";

interface SharedStateContextType {
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
}

const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined)
const SharedStateTabBarContext = createContext<SharedStateContextType | undefined>(undefined)

// Context Provider
export const SharedStateProvider = ({ children } : { children: ReactNode }) => {
  const [ state, setState ] = useState(-1);

  return (
    <SharedStateContext.Provider value={{ state, setState }}>
      {children}
    </SharedStateContext.Provider>
  );
};


export const SharedStateTabBarProvider = ({ children } : { children: ReactNode }) => {
  const [ state, setState ] = useState(0);

  return (
    <SharedStateTabBarContext.Provider value={{ state, setState }}>
      {children}
    </SharedStateTabBarContext.Provider>
  );
};


// Hooks

/* 
  - Use for update 2 different component
  - Insert hook in 2 component which need update state
   # const { state, useState } = useSharedState()
*/
export function useSharedState() {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error("useSharedState must be used within a SharedStateProvider");
  }
  return context;
}

export function useSharedStateTabBar() {
  const context = useContext(SharedStateTabBarContext);
  if (!context) {
    throw new Error("useSharedState must be used within a SharedStateProvider");
  }
  return context;
}

