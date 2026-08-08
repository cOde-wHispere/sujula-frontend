import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const RequestContext = createContext(null);

const STORAGE_KEY = "sujula.requestContext";

function loadInitialState() {
  let stored = null;

  try {
    stored = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "null"
    );
  } catch (error) {
    console.warn(
      "Unable to read saved request context.",
      error
    );
  }

  return {
    language:
      stored?.language ||
      process.env.REACT_APP_DEFAULT_LANGUAGE ||
      "en",

    currency:
      stored?.currency ||
      process.env.REACT_APP_DEFAULT_CURRENCY ||
      "USD",

    deliveryAddress:
      stored?.deliveryAddress || "",

    deliveryLatitude:
      stored?.deliveryLatitude ??
      Number(
        process.env.REACT_APP_DEFAULT_LATITUDE
      ),

    deliveryLongitude:
      stored?.deliveryLongitude ??
      Number(
        process.env.REACT_APP_DEFAULT_LONGITUDE
      ),
  };
}

export function RequestContextProvider({
  children,
}) {
  const [state, setState] =
    useState(loadInitialState);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );
  }, [state]);

  const setLanguage = useCallback(
    (language) => {
      setState((previous) => ({
        ...previous,
        language,
      }));
    },
    []
  );

  const setCurrency = useCallback(
    (currency) => {
      setState((previous) => ({
        ...previous,
        currency,
      }));
    },
    []
  );

  const setDeliveryLocation = useCallback(
    ({ address, latitude, longitude }) => {
      setState((previous) => ({
        ...previous,
        deliveryAddress: address,
        deliveryLatitude: latitude,
        deliveryLongitude: longitude,
      }));
    },
    []
  );

  return (
    <RequestContext.Provider
      value={{
        ...state,
        setLanguage,
        setCurrency,
        setDeliveryLocation,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export function useRequestContext() {
  const context =
    useContext(RequestContext);

  if (!context) {
    throw new Error(
      "useRequestContext must be used within RequestContextProvider"
    );
  }

  return context;
}