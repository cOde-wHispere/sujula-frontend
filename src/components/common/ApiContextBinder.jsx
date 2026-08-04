import { bindRequestContext } from "../../api/client";
import { useRequestContext } from "../../context/RequestContext";

export default function ApiContextBinder({ children }) {
  const context = useRequestContext();

  bindRequestContext(() => context);

  return children;
}