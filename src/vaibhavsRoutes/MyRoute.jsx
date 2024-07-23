import React from "react";
import { Route, Routes } from "react-router-dom";
// import Recommendation from "../components/Recommendation";
import BookPlace from "../pages/BookPlace";
import Testimonials from "../components/Testimonials";
import CustomerReview from "../pages/CustomerReview";
import Hotels from "../pages/Hotels";

function MyRoute() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Recommendation />} /> */}
        <Route path="/bookplace" element={<BookPlace />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/customer-review" element={<CustomerReview />} />
        <Route path="/hotels" element={<Hotels />} />
      </Routes>
    </div>
  );
}

export default MyRoute;
