import React, { useState } from 'react';
import axios from 'axios';
import '../assets/Bankers.css'
import successImage from '../assets/success.png';
import failureImage from '../assets/failure.jpg';

const BankersAlgorithm = () => {
  const [request, setRequest] = useState({ processId: '', resources: ['', '', ''] });
  const [release, setRelease] = useState({ processId: '', resources: ['', '', ''] });
  const [requestSuccess, setRequestSuccess] = useState('');
  const [releaseSuccess, setReleaseSuccess] = useState('');
  const [requestError, setRequestError] = useState('');
  const [releaseError, setReleaseError] = useState('');

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/request', {
        processId: request.processId,
        resourcesRequested: request.resources.map(resource => parseInt(resource))
      });
      setRequestSuccess(`Process ${request.processId} - Success Requesting ${request.resources.join(' ')}`);
      setRequestError('');
      setRequest({ processId: '', resources: ['', '', ''] }); // Clear input fields after successful submission
      setTimeout(() => setRequestSuccess(''), 5000); // Clear success message after 5 seconds
    } catch (error) {
      console.error('Error requesting resources:', error);
      setRequestError('Failed to request resources. Please try again.');
      setRequestSuccess('');
      setTimeout(() => setRequestError(''), 5000); // Clear error message after 5 seconds
    }
  };

  const handleReleaseSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/release', {
        processId: release.processId,
        resourcesReleased: release.resources.map(resource => parseInt(resource))
      });
      setReleaseSuccess(`Process ${release.processId} - Success Releasing ${release.resources.join(' ')}`);
      setReleaseError('');
      setRelease({ processId: '', resources: ['', '', ''] }); // Clear input fields after successful submission
      setTimeout(() => setReleaseSuccess(''), 5000); // Clear success message after 5 seconds
    } catch (error) {
      console.error('Error releasing resources:', error);
      setReleaseError('Failed to release resources. Please try again.');
      setReleaseSuccess('');
      setTimeout(() => setReleaseError(''), 5000); // Clear error message after 5 seconds
    }
  };

  const handleSetResources = async () => {
    try {
      // Step 1: Prompt for the number of resources
      const numOfResources = prompt('Enter the number of resources:');
      if (!numOfResources || isNaN(numOfResources)) {
        throw new Error('Invalid number of resources');
      }
  
      const availableResources = [];
      const allocatedResources = [];
      const maxNeededResources = [];
      
      // Step 2: Prompt for the number of instances for each resource
      for (let i = 0; i < numOfResources; i++) {
        const instanceCount = prompt(`Enter the number of instances for resource ${i + 1}:`);
        if (!instanceCount || isNaN(instanceCount)) {
          throw new Error('Invalid number of instances');
        }
        availableResources.push(parseInt(instanceCount));
        allocatedResources.push([]);
        maxNeededResources.push([]);
      }
  
      // Step 3: Prompt for the number of processes
      const numOfProcesses = prompt('Enter the number of processes:');
      if (!numOfProcesses || isNaN(numOfProcesses)) {
        throw new Error('Invalid number of processes');
      }
  
      // Step 4: Prompt for allocated and maximum needed resources for each process
      for (let i = 0; i < numOfProcesses; i++) {
        const allocated = [];
        const maxNeeded = [];
        
        for (let j = 0; j < numOfResources; j++) {
          const allocatedCount = prompt(`Enter allocated resources for process ${i + 1}, resource ${j + 1}:`);
          if (!allocatedCount || isNaN(allocatedCount)) {
            throw new Error('Invalid allocated resources');
          }
          allocated.push(parseInt(allocatedCount));
  
          const maxNeededCount = prompt(`Enter maximum needed resources for process ${i + 1}, resource ${j + 1}:`);
          if (!maxNeededCount || isNaN(maxNeededCount)) {
            throw new Error('Invalid maximum needed resources');
          }
          maxNeeded.push(parseInt(maxNeededCount));
        }
  
        allocatedResources[i] = [...allocated];
        maxNeededResources[i] = [...maxNeeded];
      }
  
      // Send the data to the server
      await axios.post('http://localhost:5000/api/set-resources', {
        available: availableResources,
        allocated: allocatedResources,
        maxNeeded: maxNeededResources
      });
  
      alert('Resources set successfully!');
    } catch (error) {
      console.error('Error setting resources:', error);
      alert('Failed to set resources. Please try again.');
    }
  };

  return (
    <div>
      <div className="container">

        <div className='cards'>
        <div className="request-section">
          <h2>Banker's Algorithm for Deadlock  - Request Resources</h2>
          <form onSubmit={handleRequestSubmit}>
            <input type="text" placeholder="Process ID" value={request.processId} onChange={(e) => setRequest({ ...request, processId: e.target.value })} />
            {[1, 2, 3].map((_, index) => (
              <input key={index} type="text" placeholder={`Resource ${index + 1}`} value={request.resources[index]} onChange={(e) => {
                const updatedResources = [...request.resources];
                updatedResources[index] = e.target.value;
                setRequest({ ...request, resources: updatedResources });
              }} />
            ))}
            <button type="submit">Request</button>
          </form>
          {requestSuccess && <div className={`success success-green`}>{requestSuccess}</div>}
          {requestError && <div className={`error error-red`}>{requestError}</div>}
        </div>
        </div>
        
        <div>
        <div className="release-section">
          <h2>Banker's Algorithm for Deadlock - Release Resources</h2>
          <form onSubmit={handleReleaseSubmit}>
            <input type="text" placeholder="Process ID" value={release.processId} onChange={(e) => setRelease({ ...release, processId: e.target.value })} />
            {[1, 2, 3].map((_, index) => (
              <input key={index} type="text" placeholder={`Resource ${index + 1}`} value={release.resources[index]} onChange={(e) => {
                const updatedResources = [...release.resources];
                updatedResources[index] = e.target.value;
                setRelease({ ...release, resources: updatedResources });
              }} />
            ))}
            <button type="submit">Release</button>
          </form>
          {releaseSuccess && <div className={`success success-green`}>{releaseSuccess}</div>}
          {releaseError && <div className={`error error-red`}>{releaseError}</div>}
        </div>
        </div>
      </div>
      <div className="set-resources">
        <button onClick={handleSetResources}>Set Resources</button>
      </div>
      <div className="images">
        {requestSuccess && <img src={successImage} alt="Request Success" />}
        {requestError && <img src={failureImage} alt="Request Failure" />}
        {releaseSuccess && <img src={successImage} alt="Release Success" />}
        {releaseError && <img src={failureImage} alt="Release Failure" />}
      </div>
   </div>
  );
};

export default BankersAlgorithm;