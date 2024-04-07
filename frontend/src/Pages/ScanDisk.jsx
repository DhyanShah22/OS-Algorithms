import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/ScanDisk.css';
import Chart from 'chart.js/auto'

const ScanDisk = () => {
  const [currentPosition, setCurrentPosition] = useState('');
  const [direction, setDirection] = useState('right');
  const [newRequests, setNewRequests] = useState('');
  const [size, setSize] = useState('');
  const [scheduledRequests, setScheduledRequests] = useState([]);

  useEffect(() => {
    // Create and update the graph when finalQueue changes
    const ctx = document.getElementById('diskGraph');
    if (scheduledRequests.length > 0) {
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: scheduledRequests.length }, (_, i) => `Step ${i + 1}`),
          datasets: [{
            label: 'Disk Head Position',
            data: scheduledRequests,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Step'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Track Number'
              }
            }
          }
        }
      });
      return () => chart.destroy(); // Cleanup on component unmount
    }
  }, [scheduledRequests]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/scan', {
        currentPosition: parseInt(currentPosition),
        direction,
        newRequests: newRequests.split(',').map(req => parseInt(req.trim())),
        size: parseInt(size)
      });
      setScheduledRequests(response.data.scheduledRequests);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>

    <div className="scan-disk-container">
      <h1>SCAN Disk Scheduling Algorithm</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPosition">Current Position:</label>
          <input
            type="number"
            id="currentPosition"
            value={currentPosition}
            onChange={(e) => setCurrentPosition(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="direction">Direction:</label>
          <select
            id="direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            required
          >
            <option value="right">Right</option>
            <option value="left">Left</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="newRequests">New Requests:</label>
          <input
            type="text"
            id="newRequests"
            value={newRequests}
            onChange={(e) => setNewRequests(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="size">Disk Size:</label>
          <input
            type="number"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>
        <button type="submit">Run Algorithm</button>
      </form>

    </div>
    <div className='output'>

      <div style={{width:'500px', height:'500px', alignItems:'center'}}>
        <canvas id="diskGraph" width="500" height="500"></canvas>
      </div>

      <div className="result">
        <h2>Scheduled Requests:</h2>
        <ul>
          {scheduledRequests.map((request, index) => (
            <li key={index}>{request}</li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default ScanDisk;
