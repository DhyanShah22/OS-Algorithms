import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const LandingPage = () => {
  return (
    <div className="container">
      <h1>Services We Offer</h1>
      <div className="services">
        {/* Use Link component for navigation */}
        <Link to="/roundRobin" className="service">
          <h2>Round Robin Algorithm</h2>
          <p>Description of the Round Robin Algorithm service</p>
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
          <h2>Banker's Algorithm for Deadlock</h2>
          <p>Description of the Banker's Algorithm service</p>
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
