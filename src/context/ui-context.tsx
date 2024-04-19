"use client";

import { createContext, useContext, useReducer } from "react";

type UIProviderProps = {
  children: React.ReactNode;
};

type UIContext = {
  isAddingEntry: boolean;
  isDragging: boolean;
  setIsAddingEntry: (isAdding: boolean) => void;
  toggleDragging: (isToggleDragging: boolean) => void;
};

type UIState = {
  isAddingEntry: boolean;
  isDragging: boolean;
};

const INIT_UI_STATE = {
  isAddingEntry: false,
  isDragging: false,
};

type UIAction =
  | { type: "UI_SET_ENTRY"; payload: boolean }
  | { type: "UI_TOGGLE_DRAGGING"; payload: boolean };

export const UIContext = createContext<UIContext | null>(null);

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case "UI_SET_ENTRY":
      return {
        ...state,
        isAddingEntry: action.payload,
      };
    case "UI_TOGGLE_DRAGGING":
      return {
        ...state,
        isDragging: action.payload,
      };
    default:
      return state;
  }
};

export const UIProvider = ({ children }: UIProviderProps) => {
  const [state, dispatch] = useReducer(uiReducer, INIT_UI_STATE);

  const setIsAddingEntry = (isAdding: boolean) =>
    dispatch({ type: "UI_SET_ENTRY", payload: isAdding });
  const toggleDragging = (isToggleDragging: boolean) =>
    dispatch({ type: "UI_TOGGLE_DRAGGING", payload: isToggleDragging });

  return (
    <UIContext.Provider
      value={{
        ...state,
        setIsAddingEntry,
        toggleDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const ctx = useContext(UIContext);

  if (ctx === null) {
    throw new Error("UIContext must be used within an UIProvider");
  }

  return ctx;
};
