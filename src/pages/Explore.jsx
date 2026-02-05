import { useEffect, useState } from "react";
import { motion } from 'framer-motion'

export default function Explore() {

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/places")
      .then((res) => res.json())
      .then((data) => {
        // backend gives object → convert to array
        setPlaces(Object.values(data));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Explore - Virtual Tours & AR</h1>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {places.map((p, idx) => (
          <motion.div key={p.name || idx} whileHover={{ scale: 1.05 }} className="bg-gray-800 rounded shadow p-6 text-center cursor-pointer text-white border border-gold/30 hover:shadow-lg transition">
            <div className="text-4xl mb-2">🏛️</div>
            <h3 className="font-bold text-white">{p.name}</h3>
            <p className="text-sm opacity-80 mt-1">{p.category}</p>
            <button className="mt-3 bg-gold text-gray-800 px-4 py-2 rounded text-sm font-medium hover:bg-gold/90 transition">Launch</button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
