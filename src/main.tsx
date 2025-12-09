import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppNavigation } from "./navigation/app-navigation.tsx";
import { AppProviders } from "./context/app-state-provider.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <BrowserRouter>
        <AppNavigation />
      </BrowserRouter>
    </AppProviders>
  </StrictMode>
);
