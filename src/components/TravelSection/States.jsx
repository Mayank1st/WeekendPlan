import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatesData from "./StatesData";
import { BsHeartFill, BsHeart } from "react-icons/bs";

function States() {
  const [searchInput, setSearchInput] = useState("");
  const [filteredStates, setFilteredStates] = useState(StatesData);
  const [likedStates, setLikedStates] = useState({}); // Track liked states
  const navigate = useNavigate();

  const handleViewDetails = (stateName) => {
    navigate(`/state/${stateName}`);
  };

  const handleSearch = () => {
    const filtered = StatesData.filter((state) =>
      state.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredStates(filtered);
  };

  const handleLike = (stateName) => {
    setLikedStates((prevLikedStates) => ({
      ...prevLikedStates,
      [stateName]: !prevLikedStates[stateName]
    }));
  };

  return (
    <div className="App">
      <h1 data-aos="fade-down" style={{ textAlign: "center" }}>
        States in India
      </h1>
      <div style={{ textAlign: "center", margin: "15px" }}>
        <input
          style={{
            padding: "8px",
            width: "25vw",
            marginRight: "4px",
            border: "none",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            borderRadius: "5px",
          }}
          type="text"
          value={searchInput}
          placeholder="Search State"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          style={{
            backgroundColor: "#1a9082",
            color: "white",
            padding: "7px",
            marginLeft: "4px",
            width: "6.5vw",
            overflow: "auto",
          }}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "25px",
        }}
      >
        {filteredStates.map((state) => (
          <div
            key={state.name}
            data-aos="fade-up"
            style={{
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "white",
              objectFit: "cover",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              width: "300px", // Adjust card width
            }}
          >
            <img
              src={state.image_url}
              alt={state.name}
              style={{
                width: "100%", // Adjust image width to fit card
                height: "150px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              data-aos="fade-left"
            >
              <h2>{state.name}</h2>
              <button
                style={{
                  backgroundColor: "#1a9082",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => handleViewDetails(state.name)}
              >
                View Details
              </button>
              <button
                style={{ background: "none", border: "none", cursor: "pointer" }}
                onClick={() => handleLike(state.name)}
              >
                {likedStates[state.name] ? (
                  <BsHeartFill fill="red" fontSize={'24px'} />
                ) : (
                  <BsHeart fontSize={'24px'} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default States;
