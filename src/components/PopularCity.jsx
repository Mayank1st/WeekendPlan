import React from "react";

const PopularCity = () => {
  return (
    <div
      id="popularCity"
      style={{
        backgroundColor: "#f5f5f5",
        paddingBottom: "50px",
        borderRadius: "20px",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            width: "500px",
            borderBottom: "4px solid #008375",
            padding: "20px 0 10px 0",
            marginBottom: "35px",
            textAlign: "center",
          }}
        >
          Popular Places in India
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "275px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <img
            style={{
              width: "115px",
              height: "110px",
            }}
            src="https://pngfile.net/public/uploads/preview/india-gate-png-image-117040373192egpqvbw46.png"
            alt="Mumbai"
          />
          <div>
            <h3>India Gate</h3>
            <span>Delhi</span>
          </div>
        </div>
        <div
          style={{
            width: "315px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <img
            style={{
              width: "150px",
              height: "125px",
            }}
            src="https://png.pngtree.com/png-vector/20240219/ourlarge/pngtree-gateway-of-india-model-on-the-transparent-background-png-image_11752932.png"
            alt="Mumbai"
          />
          <div>
            <h3> Gate of India</h3>
            <span>Mumbai</span>
          </div>
        </div>
        <div
          style={{
            width: "275px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <img
            style={{
              width: "150px",
              height: "100px",
            }}
            src="https://purepng.com/public/uploads/large/taj-mahal-skr.png"
            alt="Mumbai"
          />
          <div>
            <h3>Taj Mahal</h3>
            <span>Agra</span>
          </div>
        </div>
        <div
          style={{
            width: "275px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <img
            style={{
              width: "120px",
              height: "105px",
            }}
            src="https://pnggallery.com/wp-content/uploads/charminar-03.png"
            alt="Mumbai"
          />
          <div>
            <h3>Char Minar</h3>
            <span>Hydrabad</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PopularCity;
