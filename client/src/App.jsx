import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from "./contexts/themeContext";
import { VehicleProvider } from "./contexts/vehicleContext";
import { AuthProvider } from "./contexts/authContext";
import { FavoritesProvider } from "./contexts/favoritesContext"; // Add this

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <VehicleProvider>
          <FavoritesProvider> {/* Add this wrapper */}
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </FavoritesProvider>
        </VehicleProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App;