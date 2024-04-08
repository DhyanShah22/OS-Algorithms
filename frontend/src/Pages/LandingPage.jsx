import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Landing.css';
import Twitter from '../assets/Twitter.png';
import Hashnode from '../assets/Hashnode.png';
import Github from '../assets/GitHub.png';
import LinkedIn from '../assets/LinkedIn.png';
import RoundRobin from '../assets/roundrobin.png'
import MRU from '../assets/MRU.jpeg'
import scan from '../assets/scan.jpeg'
import Banker from '../assets/Bankers.png'

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <h1>Services We Offer</h1>
      <div className="services">

        <div className="service">
          <Link to="/roundRobin">
            <img src={RoundRobin} alt="Round Robin" />
            <h2>Round Robin Algorithm</h2>
            <p>Round Robin CPU Scheduling algorithm</p>
          </Link>
        </div>
        
        <div className="service">
          <Link to="/pageReplacement">
            <img src={MRU} alt="MRU Algorithm" />
            <h2>MRU Algorithm</h2>
            <p>Description of the MRU Algorithm service</p>
          </Link>
        </div>
      </div>
      <div className='services'>

        <div className="service">
          <Link to="/scandisk">
            <img src={scan} alt="Scan Disk Scheduling Algorithm" />
            <h2>Scan Disk Scheduling Algorithm</h2>
            <p>Description of the Scan Disk Scheduling Algorithm service</p>
          </Link>
        </div>
        
        <div className="service">
          <Link to="/bankers-algorithm">
            <img src={Banker} alt="Bankers Algorithm for Deadlock" />
            <h2>Bankers Algorithm for Deadlock</h2>
            <p>Bankers Algorithm for Deadlock Avoidance.</p>
          </Link>
        </div>
        </div>
      <div className="socials">
        <a href="https://twitter.com/KyaYaaarDhyan"><img src={Twitter} alt="Twitter" /></a>
        <a href="https://dhyanshah.hashnode.dev"><img src={Hashnode} alt="Hashnode" /></a>
        <a href="https://www.linkedin.com/in/dhyan-shah-42440b249/"><img src={LinkedIn} alt="LinkedIn" /></a>
        <a href="https://github.com/DhyanShah22"><img src={Github} alt="GitHub" /></a>
      </div>
    </div>
  );
};

export default LandingPage;
