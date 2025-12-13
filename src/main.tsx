import { createRoot } from "react-dom/client";
import "./index.css";
import { AppNavigation } from "./navigation/app-navigation.tsx";
import { AppContextProviders } from "./context/app-state-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <AppContextProviders>
    <AppNavigation />
  </AppContextProviders>
);
