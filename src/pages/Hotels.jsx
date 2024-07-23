import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Hotels.css"; // Assuming you have CSS for styling

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [visibleHotels, setVisibleHotels] = useState(6); // Number of initially visible hotels

  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/hotels");
        setHotels(response.data);
        setFilteredHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotels();
  }, []);

  const handleDestinationChange = (event) => {
    const destination = event.target.value;
    setSelectedDestination(destination);
    setVisibleHotels(6); // Reset visible hotels on filter change

    if (destination === "") {
      setFilteredHotels(hotels);
    } else {
      setFilteredHotels(
        hotels.filter(
          (hotel) =>
            hotel.destination.toLowerCase() === destination.toLowerCase()
        )
      );
    }
  };

  const handleBookHotel = (hotel) => {
    navigate("/booking", { state: { hotel } }); // Redirect to Booking component with hotel data
  };

  const handleLoadMore = () => {
    setVisibleHotels((prevVisibleHotels) => prevVisibleHotels + 6); // Increase the number of visible hotels by 6
  };

  return (
    <div className="container">
      <div className="hotels-container">
        <div className="filter-container">
          <div>
            <label htmlFor="destination">Select Destination:</label>
            <select
              id="destination"
              value={selectedDestination}
              onChange={handleDestinationChange}
            >
              <option value="">All Destinations</option>
              {/* Populate with unique destinations */}
              {[...new Set(hotels.map((hotel) => hotel.destination))].map(
                (destination) => (
                  <option key={destination} value={destination}>
                    {destination}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <div className="hotels-list">
          {filteredHotels.slice(0, visibleHotels).map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <img src={hotel.image} alt={hotel.name} className="hotel-image" />
              <h3>{hotel.name}</h3>
              <p>
                <strong>Facilities:</strong> {hotel.facilities.join(", ")}
              </p>
              <p>
                <strong>Famous for:</strong> {hotel.famousFor}
              </p>
              <p>
                <strong>Destination:</strong> {hotel.destination}
              </p>
              <p>
                <strong>Stars:</strong> {hotel.stars}
              </p>
              <p>
                <strong>Rating:</strong> {hotel.rating}
              </p>
              <button
                onClick={() => handleBookHotel(hotel)}
                className="book-hotels-btn"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
        {visibleHotels < filteredHotels.length && (
          <button id="load" onClick={handleLoadMore} className="load-more-btn">
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Hotels;
