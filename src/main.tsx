import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { LeagueProvider } from "./contexts/LeagueContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LeagueProvider>
    <App />
  </LeagueProvider>,
);
