import AppRoutes from "./routes/AppRoutes";
import { useGeolocation } from "./hooks/useGeolocation";

function App() {
  useGeolocation();

  return <AppRoutes />;
}

export default App;