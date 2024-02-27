import React from 'react'
import html2pdf from 'html2pdf.js';


function Downloadpaper() {

    const handleDownloadPDF = () => {
        const pdfElement = document.getElementById('pdf-container');
    
        if (pdfElement) {
          html2pdf(pdfElement, {
            margin: 10,
            filename: 'answeredMCQs.pdf',
            html2canvas: { scale: 3 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          });
        }
      };

  return (
    <div className="fixed top-10 right-0 p-8">
      <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleDownloadPDF}
            >
              Download
            </button>
    </div>
  )
}

export default Downloadpaper;