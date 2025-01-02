import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import "./assets/css/global.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
