import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
<<<<<<< HEAD
import { checkFirebaseConnection } from "./lib/checkFirebaseConnection";

checkFirebaseConnection();
=======
>>>>>>> 18fc01854c1e2793205673b08e1cfbea14a490ab

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
