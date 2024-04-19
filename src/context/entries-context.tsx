"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { Entry } from "@/interfaces";
import { useSnackbar } from "notistack";
import axios, { AxiosError } from "axios";

type EntriesProviderProps = {
  children: React.ReactNode;
};

type EntriesContext = {
  entries: Entry[];
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry, showSnackbar?: boolean) => void;
};

type EntriesState = {
  entries: Entry[];
};

type EntriesAction =
  | {
      type: "[Entry] Add-Entry";
      payload: Entry;
    }
  | {
      type: "[Entry] Update-Entry";
      payload: Entry;
    }
  | {
      type: "[Entry] refresh-data";
      payload: Entry[];
    };

const INIT_ENTRIES_STATE = {
  entries: [],
};

export const EntriesContext = createContext<EntriesContext | null>(null);

export const entriesReducer = (
  state: EntriesState,
  action: EntriesAction
): EntriesState => {
  switch (action.type) {
    case "[Entry] Add-Entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "[Entry] Update-Entry":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }

          return entry;
        }),
      };
    case "[Entry] refresh-data":
      return {
        ...state,
        entries: [...action.payload],
      };
    default:
      return state;
  }
};

export const EntriesProvider = ({ children }: EntriesProviderProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, dispatch] = useReducer(entriesReducer, INIT_ENTRIES_STATE);

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await axios.post<Entry>("/api/entries", {
        description,
      });
      dispatch({ type: "[Entry] Add-Entry", payload: data });
    } catch (error: any) {
      console.error("Error in addNewEntry Method");
      throw new AxiosError(error, "500");
    }
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ) => {
    try {
      const { data } = await axios.put<Entry>(`/api/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: "[Entry] Update-Entry", payload: data });
      if (showSnackbar) {
        enqueueSnackbar("Entry Updated!", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    } catch (error: any) {
      console.log("Error update entry method");
      throw new AxiosError(error, "500");
    }
  };

  const refreshEntries = async () => {
    const { data } = await axios.get<Entry[]>("/api/entries");
    dispatch({ type: "[Entry] refresh-data", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};

export const useEntriesContext = () => {
  const ctx = useContext(EntriesContext);

  if (ctx === null) {
    throw new Error("EntriesContext must be used within an EntriesProvider");
  }

  return ctx;
};
