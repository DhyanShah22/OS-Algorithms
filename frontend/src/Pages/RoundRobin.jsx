import React, { useState } from 'react';
import axios from 'axios';
//import Plot from 'react-plotly.js';
import '../assets/RoundRobin.css';

const RoundRobin = () => {
  const [burstTime, setBurstTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [quantumValue, setQuantumValue] = useState('');
  const [processes, setProcesses] = useState([]);
  const [completedProcesses, setCompletedProcesses] = useState([]);
  const [avgTurnaroundTime, setAvgTurnaroundTime] = useState('');
  const [avgWaitingTime, setAvgWaitingTime] = useState('');
  //const [ganttChartData, setGanttChartData] = useState([]);

  const handleAddProcess = () => {
    const newProcess = { burstTime, arrivalTime };
    axios.post('http://localhost:4000/api/process', newProcess)
      .then(response => {
        console.log(response.data); // Handle success response
        setProcesses([...processes, newProcess]);
      })
      .catch(error => {
        console.error('Error adding process:', error); // Handle error
      });
    setBurstTime('');
    setArrivalTime('');
  };

  const handleSetQuantum = () => {
    const data = { quantumValue };
    axios.post('http://localhost:4000/api/process/setQuantum', data)
      .then(response => {
        console.log(response.data); // Handle success response
      })
      .catch(error => {
        console.error('Error setting quantum:', error); // Handle error
      });
    setQuantumValue('');
  };

  const handleCalculateProcesses = () => {
    axios.get('http://localhost:4000/api/process/calculate')
      .then(response => {
        console.log(response.data); // Handle success response
        const { processes, avgTurnaroundTime, avgWaitingTime } = response.data;
        setCompletedProcesses(processes);
        setAvgTurnaroundTime(avgTurnaroundTime);
        setAvgWaitingTime(avgWaitingTime);

        // Prepare data for the Gantt chart
        const ganttData = processes.map((process, index) => ({
          x: [new Date(0), new Date(process.completionTime)],
          y: [index + 1, index + 1],
          type: 'scatter',
          mode: 'lines',
          name: `Process ${index + 1}`,
          line: { color: 'blue', width: 20 }, // Adjust line color and width as needed
        }));
        setGanttChartData(ganttData);
      })
      .catch(error => {
        console.error('Error calculating processes:', error); // Handle error
      });
  };

  const renderGanttChart = (completedProcesses) => {
    if (!completedProcesses || completedProcesses.length === 0) {
      return null; // Return null if completedProcesses is not available or empty
    }
  
    const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6610f2', '#28a745', '#007bff', '#dc3545', '#ffc107'];
  
    let bars = [];
    completedProcesses.forEach((process, index) => {
      const barStyle = {
        width: `${process.burstTime * 10}px`, // Adjust width as needed
        background: colors[index % colors.length],
        color: '#fff',
        textAlign: 'center',
        border: '2px solid #333',
        position: 'relative',
      };
  
      bars.push(
        <div key={index} style={barStyle}>
          <div>{`P${index + 1}`}</div>
          <div style={{ textAlign: 'left' }}>AT: {process.arrivalTime}</div>
          <div style={{ textAlign: 'right' }}>CT: {process.completionTime}</div>
        </div>
      );
    });
  
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }} className="gantt">
        {bars}
      </div>
    );
  };
  
  return (
    <div className="App">
      <h1>Round Robin Algorithm</h1>
      <div>
        <h2>Add Process</h2>
        <input
          type="number"
          placeholder="Burst Time"
          value={burstTime}
          onChange={(e) => setBurstTime(e.target.value)}
        />
        <input
          type="number"
          placeholder="Arrival Time"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
        />
        <button onClick={handleAddProcess}>Add Process</button>
      </div>
      <div>
        <h2>Set Quantum</h2>
        <input
          type="number"
          placeholder="Quantum Value"
          value={quantumValue}
          onChange={(e) => setQuantumValue(e.target.value)}
        />
        <button onClick={handleSetQuantum}>Set Quantum</button>
      </div>
      <div>
        <h2>Calculate Processes</h2>
        <button onClick={handleCalculateProcesses}>Calculate</button>
      </div>
      <div>
        <h2>Process Table</h2>
        <table>
          <thead>
            <tr>
              <th>Burst Time</th>
              <th>Arrival Time</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process, index) => (
              <tr key={index}>
                <td>{process.burstTime}</td>
                <td>{process.arrivalTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Completed Processes</h2>
        <table>
          <thead>
            <tr>
              <th>Burst Time</th>
              <th>Arrival Time</th>
              <th>Completion Time</th>
              <th>Turnaround Time</th>
              <th>Waiting Time</th>
            </tr>
          </thead>
          <tbody>
            {completedProcesses.map((process, index) => (
              <tr key={index}>
                <td>{process.burstTime}</td>
                <td>{process.arrivalTime}</td>
                <td>{process.completionTime}</td>
                <td>{process.turnaroundTime}</td>
                <td>{process.waitingTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Average Turnaround Time: {avgTurnaroundTime}</h2>
        <h2>Average Waiting Time: {avgWaitingTime}</h2>
      </div>
      <div>
        <h2>Gantt Chart</h2>
        {renderGanttChart(completedProcesses)}
        {/* <Plot
          data={ganttChartData}
          layout={{
            title: 'Gantt Chart',
            xaxis: {
              type: 'date',
              title: 'Time',
            },
            yaxis: {
              autorange: 'reversed',
              title: 'Processes',
              tickvals: processes.map((_, index) => index + 1),
              ticktext: processes.map((_, index) => `Process ${index + 1}`),
            },
          }}
          config={{ responsive: true }}
        /> */}
      </div>
    </div>
  );
};

export default RoundRobin;