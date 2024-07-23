import React from "react";
import PageSection from "./PageComponent";
import BrandStats from "./BrandStats";
import States from "./TravelSection/States";
import StatsSection from "./TravelSection/StatesSection";
import Footer from "../components/Footer";
import "../Styles/Footer.module.css";
import Testimonials from "../components/Testimonials";
import PopularCity from "../components/PopularCity";

export default function HomePage() {
  return (
    <>
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              style={{ objectFit: "cover" }}
              src="https://plus.unsplash.com/premium_photo-1661915320026-84ca2c96faa7?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2VzJTIwdG8lMjB2aXNpdCUyMGluJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Adventure Awaits</h5>
              <h1 className="slider-page1-h1">
                Embrace the thrill of the weekend
              </h1>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              style={{ objectFit: "cover" }}
              src="https://www.stayvista.com/blog/wp-content/uploads/2023/11/nature-photographer-29ezCWtMtnM-unsplash-1-scaled-1-2048x1152.jpg"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>TOURS & TRAVEL</h5>
              <h1 className="slider-page1-h1">
                Let's Discover The World Together
              </h1>
            </div>
          </div>
          <div className="carousel-item">
            <img
              style={{ objectFit: "cover" }}
              src="https://www.stayvista.com/blog/wp-content/uploads/2024/07/arif-khan-3iCOcOCtztw-unsplash-2048x1536.jpg"
              className="d-block w-100"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Finding magic in every moment</h5>
              <h1 className="slider-page1-h1">
                Discover Amazing Places With Us
              </h1>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="about-us-banner-main-div container-fluid">
        <div className="about-us-banner container mt-5 d-flex">
          <div className="about-us-banner-img"></div>
          <div className="about-us-banner-text-maindiv">
            <div className="about-us-banner-text-maindiv-inner-div">
              <div>
                <h5>ABOUT US</h5>
                <h1>We Provide Best Tour Packages In Your Budget</h1>
                <p>
                  At Wanderlust Travels, we design personalized travel
                  experiences to make your dreams come true. With over a decade
                  in the industry, our team excels at crafting unique
                  itineraries for beach getaways Let us turn your travel dreams
                  into reality with exceptional service and expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Section */}
      <div className="page-section container">
        <PageSection />
      </div>

      {/* Brand Stats Section */}
      <div className="brand-stats-section container mt-3">
        <BrandStats />
      </div>
      {/* Travel Section */}
      <div className="container mt-3">
        {" "}
        <PopularCity />
      </div>

      <div className="container mt-5">
        <h1 data-aos="fade-down" style={{ textAlign: "center" }}>
          States in India
        </h1>

        <StatsSection />
      </div>
      <div className="container mt-3">
        {" "}
        <Testimonials />
      </div>

      <div className="container mt-3">
        {" "}
        <Footer />
      </div>
    </>
  );
}
