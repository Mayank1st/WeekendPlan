import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../Styles/PlacesList.css";

const BookPlace = () => {
  const [places, setPlaces] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://localhost:4000/places");
        if (response) {
          setPlaces(response.data);
          console.log(response.data);
        } else {
          console.error("Data fetched is not an array");
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  const displayedPlaces = Array.isArray(places)
    ? showAll
      ? places
      : places.slice(0, 8)
    : [];

  const goToHotels = () => {
    navigate("/hotels");
  };

  const goToBookings = () => {
    navigate("/bookings");
  };

  return (
    <div className="container" id="places-container">
      <div className="places-list">
        {displayedPlaces.map((place) => (
          <motion.div
            key={place.id}
            className="place-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img src={place.img} alt={place.name} className="place-image" />
            <h3>{place.name}</h3>
            <p>
              <strong>Famous for:</strong> {place.famous_for}
            </p>
            <p>
              <strong>Destination Fees:</strong> {place.destination_fees}
            </p>
            <p>
              <strong>Available Hotels:</strong>{" "}
              {place.available_hotels.join(", ")}
            </p>
            <p>
              <strong>State:</strong> {place.state}
            </p>
            <div className="card-buttons">
              <button className="explore-btn" onClick={goToHotels}>
                Explore Hotels
              </button>
              <button className="book-btn" onClick={goToBookings}>
                Book my Trip
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {places.length > 8 && (
        <div className="toggle-button">
          <button onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BookPlace;
