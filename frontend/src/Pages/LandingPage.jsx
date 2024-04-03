import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import '../assets/Landing.css'

// import '../assets/Bankers.css'
const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <h1>Services We Offer</h1>
      <div className="services">
        {/* Use Link component for navigation */}
        <Link to="/roundRobin" className="service">
          <h2>Round Robin Algorithm</h2>
          <p>Round Robin CPU Scheduling algorithm</p>
        </Link>
        <div className="service">
          <h2>MRU Algorithm</h2>
          <p>Description of the MRU Algorithm service</p>
        </div>
        <div className="service">
          <h2>Scan Disk Scheduling Algorithm</h2>
          <p>Description of the Scan Disk Scheduling Algorithm service</p>
        </div>
        <div className="service">
          <Link to="/bankers-algorithm" className="service">
          <h2>Bankers Algorithm for Deadlock</h2>
          <p>Bankers Algorithm for Deadlock Avoidance.</p>
          </Link>
        </div>
      </div>
      <div className="socials">
        <a href="https://twitter.com"><img src="twitter-icon.png" alt="Twitter" /></a>
        <a href="https://linkedin.com"><img src="linkedin-icon.png" alt="LinkedIn" /></a>
        <a href="https://github.com"><img src="github-icon.png" alt="GitHub" /></a>
      </div>
    </div>
  );
};

export default LandingPage;