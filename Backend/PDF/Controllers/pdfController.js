// controllers/pdfController.js
const PDFDocument = require('pdfkit');

const generatePDF = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            const pdfDoc = new PDFDocument();
            let pdfContent = '';

            // Add data to PDF content
            pdfContent += 'PDF Document Generated from Microservices:\n';
            pdfContent += JSON.stringify(data);

            pdfDoc.text(pdfContent);
            const buffers = [];
            pdfDoc.on('data', buffers.push.bind(buffers));
            pdfDoc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });
            pdfDoc.end();
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { generatePDF };
