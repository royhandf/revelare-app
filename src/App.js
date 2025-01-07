import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import "./assets/css/global.css";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
