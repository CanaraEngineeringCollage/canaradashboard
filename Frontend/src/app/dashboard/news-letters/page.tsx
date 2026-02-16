import React from 'react';
// Import the library tools needed to read the PDF
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// This tells the library how to process the PDF in the background
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const AcademicCalendarCard = () => {
    // Just point it to the PDF in your public folder
    const pdfPath = "/academic-calendar.pdf";

    return (
        <div className="flex flex-col w-40 text-textGray text-[17px]">
            <a
                href={pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded shadow h-56 w-40 border border-gray-200"
            >
                {/* This is what replaces your <img> tag! */}
                {/* It automatically grabs the PDF and renders it as an image */}
                <Document file={pdfPath} className="w-full h-full object-cover">
                    {/* pageNumber={1} tells it to ONLY grab the cover page */}
                    <Page 
                        pageNumber={1} 
                        width={160} 
                        renderTextLayer={false} 
                        renderAnnotationLayer={false} 
                    /> 
                </Document>
            </a>
            
            <span className="mt-2 text-center">Academic Calendar</span>
        </div>
    );
};

export default AcademicCalendarCard;