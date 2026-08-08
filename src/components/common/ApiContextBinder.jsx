import { useEffect } from "react";
import { bindRequestContext } from "../../api/client";
import { useRequestContext } from "../../context/RequestContext";

export default function ApiContextBinder({ children }) {
  const context = useRequestContext();

  useEffect(() => {
    bindRequestContext(() => context);
  }, [context]);

  return children;
}