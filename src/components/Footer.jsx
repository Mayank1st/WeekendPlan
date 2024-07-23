import React from "react";
import Classes from "../Styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="container-fluid">
      <footer className={Classes.footerContainer}>
        <div className={Classes.footer}>
          <div id="footer-icon" className={Classes.socialLink}>
            <p>+8801305282768</p>
            <p>WeekenPlan@gmail.com</p>

            <a
              href="https://www.facebook.com/login/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                style={{ margin: "8px" }}
                icon={faFacebookF}
                size="2x"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/vaibhav-more-8b916124a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                style={{ margin: "8px" }}
                icon={faLinkedinIn}
                size="2x"
              />
            </a>
            <a
              href="https://github.com/vaibhav540"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                style={{ margin: "8px" }}
                icon={faGithub}
                size="2x"
              />
            </a>
          </div>

          <div className={Classes.footerLogo}>
            <a href="#hero">
              <img
                src="https://st.depositphotos.com/1877361/3020/v/450/depositphotos_30204021-stock-illustration-alphabet-logo.jpg"
                alt="Weekend Planning Logo"
              />
              <p>
                Weekend <span>Planning</span>
              </p>
            </a>
          </div>

          <div className={Classes.footerInfo}>
            <h3>Explore the world from your inbox</h3>
            <p>
              Let us inspire your next getaway with new destinations and special
              deals.
            </p>

            <div>
              <input type="email" placeholder="Email address" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
