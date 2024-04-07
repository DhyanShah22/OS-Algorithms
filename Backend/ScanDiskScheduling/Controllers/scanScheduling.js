let requestQueue = [];
let diskSize = 0;

function addRequest(trackNumber) {
    requestQueue.push(trackNumber);
}

async function SCAN(currentPosition, direction, diskSize, requestQueue) {
    let result = [];

    if (direction === 'right') {
        // Add requests greater than or equal to currentPosition
        result = requestQueue.filter(req => req >= currentPosition);
        result.sort((a, b) => a - b);

        // Add diskSize if not already included and moving to the right
        if (!result.includes(diskSize)) {
            result.push(diskSize);
        }

        // Append requests lesser than currentPosition
        result = result.concat(requestQueue.filter(req => req < currentPosition));
    } else if (direction === 'left') {
        // Add 0 to the beginning
        result.push(0);

        // Add requests lesser than currentPosition (excluding diskSize)
        result = result.concat(requestQueue.filter(req => req < currentPosition && req !== diskSize));
        result.sort((a, b) => b - a);

        // Prepend requests greater than or equal to currentPosition
        result = result.concat(requestQueue.filter(req => req >= currentPosition));
    } else {
        throw new Error('Invalid direction');
    }

    return result;
}


async function handleRequest(req, res) {
    try {
        const { currentPosition, direction, newRequests, size } = req.body;

        if (size && typeof size === 'number') {
            diskSize = size;
        }

        if (newRequests && Array.isArray(newRequests)) {
            newRequests.forEach(request => addRequest(request));
        }

        const result = await SCAN(currentPosition, direction, diskSize, requestQueue);

        result.forEach(track => {
            const index = requestQueue.indexOf(track);
            if (index !== -1) {
                requestQueue.splice(index, 1);
            }
        });

        res.json({ scheduledRequests: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    handleRequest
}
