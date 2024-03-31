// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { generatePDF } = require('./Controllers/pdfController');
const verifyTokenMiddleware = require('./Middleware/verifyToken');

const app = express();

app.use(express.json());

app.post('/generate-pdf', verifyTokenMiddleware, async (req, res) => {
    try {
        const data = await fetchDataFromOtherServices(req.user);

        const pdfData = await generatePDF(data);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Length': pdfData.length,
            'Content-Disposition': 'attachment; filename="generated_pdf.pdf"'
        });
        res.send(pdfData);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

async function fetchDataFromOtherServices(user) {
    // Implement logic to fetch data from other services
    // Example: Fetch data from BankerAlgo, MRU, etc.
    return { user }; // Dummy data for demonstration
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`PDF Generation Microservice listening on port ${PORT}`);
});
