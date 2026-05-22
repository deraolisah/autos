import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from "./contexts/themeContext";
import { VehicleProvider } from "./contexts/vehicleContext";
import { AuthProvider } from "./contexts/authContext";
import { FavoriteProvider } from "./contexts/favoriteContext";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <VehicleProvider>
          <FavoriteProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </FavoriteProvider>
        </VehicleProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App;