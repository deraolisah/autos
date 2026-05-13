import { useVehicle } from "../../contexts/vehicleContext";

const Favorites = () => {
  const { favorites, isFavorited, formatAmount, toggleFavorite } = useVehicle();

  return (
    <section className="container py-6">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-600">You haven’t favorited any vehicles yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map(vehicle => {
            const isFav = favorites.some(fav => fav._id === vehicle._id);
            return (
              <div key={vehicle._id} className="border rounded-md p-4 shadow-sm">
                <img
                  src={vehicle.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-semibold">{vehicle.year} {vehicle.name}</h2>
                <p className="font-bold mt-1">{formatAmount(vehicle.price)}</p>
                <button
                  className={`mt-2 p-1.5 rounded-full ${isFav ? "text-red-600" : "text-gray-400"}`}
                  onClick={() => toggleFavorite(vehicle._id)}
                >
                  {isFav ? "❤️ Favorited" : "♡ Add to Favorites"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};


export default Favorites;