import { createContext, useContext, useEffect, useState } from "react";

const RequestContext = createContext(null);

const STORAGE_KEY = "sujula.requestContext";

function loadInitialState() {
  try {
    const stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "null"
    );

    return {
      language:
        stored?.language ||
        process.env.REACT_APP_DEFAULT_LANGUAGE,

      currency:
        stored?.currency ||
        process.env.REACT_APP_DEFAULT_CURRENCY,

      location:
        stored?.location || {
          lat: Number(process.env.REACT_APP_DEFAULT_LATITUDE),
          lon: Number(process.env.REACT_APP_DEFAULT_LONGITUDE),
        },
    };
  } catch {
    return {
      language: process.env.REACT_APP_DEFAULT_LANGUAGE,
      currency: process.env.REACT_APP_DEFAULT_CURRENCY,
      location: {
        lat: Number(process.env.REACT_APP_DEFAULT_LATITUDE),
        lon: Number(process.env.REACT_APP_DEFAULT_LONGITUDE),
      },
    };
  }
}

export function RequestContextProvider({ children }) {
  const [state, setState] = useState(loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setLanguage = (language) =>
    setState((prev) => ({
      ...prev,
      language,
    }));

  const setCurrency = (currency) =>
    setState((prev) => ({
      ...prev,
      currency,
    }));

  const setLocation = (location) =>
    setState((prev) => ({
      ...prev,
      location,
    }));

  return (
    <RequestContext.Provider
      value={{
        ...state,
        setLanguage,
        setCurrency,
        setLocation,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export function useRequestContext() {
  const context = useContext(RequestContext);

  if (!context) {
    throw new Error(
      "useRequestContext must be used inside RequestContextProvider."
    );
  }

  return context;
}