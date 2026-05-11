import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from "./contexts/themeContext";
import { VehicleProvider } from "./contexts/vehicleContext";
import { AuthProvider } from "./contexts/authContext";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <VehicleProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </VehicleProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App;