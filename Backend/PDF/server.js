const express = require('express');
const app = express();
const fs = require('fs');
require('dotenv').config()
const PDFDocument = require('pdfkit');
const axios = require('axios');
const verifyTokenMiddleware = require('./Middleware/verifyToken');
const { promises } = require('dns');

app.use(express.json());

app.post('/generate-pdf', verifyTokenMiddleware, async (req, res) => {
    try {
        const pdfBuffer = await generatePDF(req.user);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="report.pdf"'
        });
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

async function generatePDF(user) {
    return new Promise(async (resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });
        
        try {
            // Call each microservice to get output
            const roundRobinOutput = await getRoundRobinOutput(user.token);
            const scanDiskOutput = await getScanDiskOutput(user.token);
            const mruOutput = await getMRUOutput(user.token);
            const bankersOutput = await getBankersOutput(user.token);

            // Compile the PDF
            doc.text('Round Robin Output:');
            doc.text(JSON.stringify(roundRobinOutput));
            doc.text('Scan Disk Output:');
            doc.text(JSON.stringify(scanDiskOutput));
            doc.text('MRU Output:');
            doc.text(JSON.stringify(mruOutput));
            doc.text('Banker\'s Algorithm Output:');
            doc.text(JSON.stringify(bankersOutput));

            // Finalize the PDF
            doc.end();
            console.log('PDF generated successfully.');
        } catch (error) {
            console.error('Error generating PDF:', error);
            reject(error);
        }
    });
}

async function getRoundRobinOutput(authToken) {
    try {
        const response = await axios.get('http://localhost:4000/api/process/calculate', {
            // Provide necessary data if required
        }, { headers: { Authorization: `Bearer ${authToken}` } });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching Round Robin output');
    }
}

async function getScanDiskOutput(authToken) {
    try {
        const response = await axios.post('http://localhost:6000/api/scan', {
            // Provide necessary data if required
        }, { headers: { Authorization: `Bearer ${authToken}` } });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching Scan Disk output');
    }
}

async function getMRUOutput(authToken) {
    try {
        const response = await axios.post('http://localhost:7000/api/page', {
            // Provide necessary data if required
        }, { headers: { Authorization: `Bearer ${authToken}` } });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching MRU output');
    }
}

async function getBankersOutput(authToken) {
    try {
        const [request, release] = await Promise.all([
            axios.post('http://localhost:5000/api/request', {        }, { headers: { Authorization: `Bearer ${authToken}` } }),
            axios.post('http://localhost:5000/api/release', {        }, { headers: { Authorization: `Bearer ${authToken}` } })
        ])
        
        const output = {
            request: request.data,
            release: release.data
        }

        return output;
    } catch (error) {
        throw new Error('Error fetching Banker\'s Algorithm output');
    }
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
