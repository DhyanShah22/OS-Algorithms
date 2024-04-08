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
        <div className='service'>
        <Link to="/roundRobin" >
          <h2>Round Robin Algorithm</h2>
          <p>Round Robin CPU Scheduling algorithm</p>
        </Link>
        </div>
        
        <div className="service">
          <Link to="/pageReplacement">
          <h2>MRU Algorithm</h2>
          <p>Description of the MRU Algorithm service</p>
          </Link>
        </div>
        <div className="service">
          <Link to="/scandisk">
          <h2>Scan Disk Scheduling Algorithm</h2>
          <p>Description of the Scan Disk Scheduling Algorithm service</p>
          </Link>
        </div>
        <div className="service">
          <Link to="/bankers-algorithm" >
          <h2>Bankers Algorithm for Deadlock</h2>
          <p>Bankers Algorithm for Deadlock Avoidance.</p>
          </Link>
        </div>
      </div>
      <div className="socials">
        <a href="https://twitter.com/KyaYaaarDhyan"><img src="Twitter.png" alt="Twitter" /></a>
        <a href="https://dhyanshah.hashnode.dev"><img src="../assests/Hashnode.png" alt="Hashnode" /></a>
        <a href="https://www.linkedin.com/in/dhyan-shah-42440b249/"><img src="../assets/LinkedIn.png" alt="LinkedIn" /></a>
        <a href="https://github.com/DhyanShah22"><img src='../assets/GitHub.png' alt="GitHub" /></a>
      </div>
    </div>
  );
};

export default LandingPage;