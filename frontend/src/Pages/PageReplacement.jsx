import React, { useState } from 'react';
import axios from 'axios';
import '../assets/PageReplacement.css';

const PageReplacementAlgorithm = () => {
  const [referenceString, setReferenceString] = useState('');
  const [numberOfFrames, setNumberOfFrames] = useState('');
  const [pageFaults, setPageFaults] = useState(0);
  const [hits, setHits] = useState(0);
  const [hitPercent, setHitPercent] = useState(0);
  const [faultPercent, setFaultPercent] = useState(0);
  const [results, setResults] = useState([]);
  const [hitsTable, setHitsTable] = useState([]);
  const [faultsTable, setFaultsTable] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const referenceStringArray = referenceString.split(',').map((item) => parseInt(item.trim()));
      const response = await axios.post('http://localhost:7000/api/page', {
        referenceString: referenceStringArray,
        numberOfFrames: parseInt(numberOfFrames)
      });

      setPageFaults(response.data.pageFaults);
      setHits(response.data.hits);
      setHitPercent(response.data.hitPercent.toFixed(2));
      setFaultPercent(response.data.faultPercent.toFixed(2));

      console.log('Results:', results);
      console.log('Hits Table:', hitsTable);
      console.log('Faults Table:', faultsTable);

      // Format results for table
      const formattedResults = Array.from({ length: numberOfFrames }, (_, i) => ({
        frame: i + 1,
        content: response.data.results[i] || '-'
      }));
      setResults(formattedResults);

      // Build hits table
      const hitsArray = Array.from({ length: hits }, (_, i) => i + 1);
      setHitsTable(hitsArray);

      // Build faults table
      const faultsArray = Array.from({ length: pageFaults }, (_, i) => i + 1);
      setFaultsTable(faultsArray);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1 className="heading">Page Replacement Algorithm</h1>
      <div className="mru">
        <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="referenceString">Reference String:</label>
            <input
              type="text"
              id="referenceString"
              value={referenceString}
              onChange={(e) => setReferenceString(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfFrames">Number of Frames:</label>
            <input
              type="number"
              id="numberOfFrames"
              value={numberOfFrames}
              onChange={(e) => setNumberOfFrames(e.target.value)}
              required
            />
          </div>
          <button type="submit">Run Algorithm</button>
        </form>
        </div>
      </div>
      
      <div className="results-container">
        <div className="results">
          <h2>Results</h2>
          <table>
            <thead>
              <tr>
                <th>Frame</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.frame}</td>
                  <td>{result.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="summary">
            <p>Number of Page Faults: {pageFaults}</p>
            <p>Number of Hits: {hits}</p>
            <p>Hit Percentage: {hitPercent}%</p>
            <p>Fault Percentage: {faultPercent}%</p>
          </div>
        </div>
      </div>

      <div className="hits-and-faults">
        <div className="hits-table">
          <h2>Hits</h2>
          <ul>
            {hitsTable.map((hit, index) => (
              <li key={index}>Hit {hit}</li>
            ))}
          </ul>
        </div>
        <div className="faults-table">
          <h2>Faults</h2>
          <ul>
            {faultsTable.map((fault, index) => (
              <li key={index}>Fault {fault}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageReplacementAlgorithm;
