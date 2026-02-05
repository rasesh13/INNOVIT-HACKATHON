import { useEffect, useState } from "react";
import { motion } from 'framer-motion'

export default function Explore() {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/places")
      .then((res) => res.json())
      .then((data) => {
        const placesArray = Object.entries(data).map(([key, value]) => ({
          ...value,
          key: key
        }));
        setPlaces(placesArray);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!places.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Explore Delhi Heritage</h1>
        <p className="text-gray-300">Loading monuments...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2 text-white">Explore Delhi Heritage</h1>
      <p className="text-gray-300 mb-8">Click on any monument to learn more</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {places.map((p) => (
          <motion.div
            key={p.key}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedPlace(p)}
            className="relative group h-64 rounded-lg overflow-hidden shadow-lg cursor-pointer border border-gold/30 hover:shadow-2xl transition"
          >
            <img
              src={p.image || "https://via.placeholder.com/400x300"}
              alt={p.name}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/400x300?text=" + encodeURIComponent(p.name);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-50 transition" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
              <h3 className="text-xl font-bold mb-1">{p.name}</h3>
              <p className="text-sm text-gray-300 mb-3">{p.cluster}</p>
              <button className="w-full bg-gold text-gray-800 px-4 py-2 rounded font-medium hover:bg-gold/90 transition text-sm">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedPlace && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPlace(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPlace.image || "https://via.placeholder.com/400x300"}
              alt={selectedPlace.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">
              <button
                onClick={() => setSelectedPlace(null)}
                className="float-right text-gray-400 hover:text-white text-2xl mb-4"
              >
                ✕
              </button>

              <h2 className="text-4xl font-bold text-white mb-2 clear-both">{selectedPlace.name}</h2>
              <p className="text-gold text-lg mb-4">{selectedPlace.cluster}</p>

              {selectedPlace.description && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">About</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedPlace.description}</p>
                </div>
              )}

              {selectedPlace.year_built && (
                <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-800 p-4 rounded">
                  <div>
                    <p className="text-gray-400 text-sm">Built</p>
                    <p className="text-white font-bold">{selectedPlace.year_built}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Category</p>
                    <p className="text-white font-bold">{selectedPlace.category || "Monument"}</p>
                  </div>
                </div>
              )}

              {selectedPlace.tickets && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">Ticket Prices</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedPlace.tickets).map(([type, price]) => (
                      <div key={type} className="flex justify-between bg-gray-800 p-3 rounded">
                        <span className="text-gray-300 capitalize">{type}</span>
                        <span className="text-white font-bold">₹{price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedPlace(null)}
                className="w-full bg-gold text-gray-800 px-4 py-3 rounded font-bold text-lg hover:bg-gold/90 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
