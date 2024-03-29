const Page = require('../Models/Page');

let memory = [];

function findPageById(pageId) {
    return memory.find(page => page.id === pageId);
}

function addPageToMemory(pageId, content) {
    const newPage = new Page(pageId, content);
    memory.push(newPage);
    console.log(`New page added to memory: ${JSON.stringify(newPage)}`);
    console.log('Current memory state:', memory); // Log memory after adding a new page
}

function updateLastAccessed(pageId) {
    const page = findPageById(pageId);
    if (page) {
        page.lastAccessed = Date.now();
    }
}

function mruPageReplacement(pageId, content) {
    const existingPage = findPageById(pageId);
    if (existingPage) {
        console.log(`Page with ID ${pageId} already exists.`);
        updateLastAccessed(pageId);
    } else {
        console.log(`Adding new page with ID ${pageId} to memory.`);
        addPageToMemory(pageId, content);
    }
}

function handlePageRequest(req, res) {
    try {
        const { pageId, content } = req.body;

        console.log(`Received request to handle page with ID ${pageId}`);

        if (!pageId || !content) {
            throw new Error('Page ID and content are required.');
        }

        mruPageReplacement(pageId, content);

        res.json({ message: 'Page request handled successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    handlePageRequest
};
