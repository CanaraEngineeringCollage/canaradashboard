"use client";

import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// 1. Updated CSS import paths (removed /esm/)
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// 2. Updated worker setup for Next.js compatibility
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const AcademicCalendarCard = () => {
    // Just point it to the PDF in your public folder
    const pdfPath = "/Magazine1.pdf";

    return (
        <div className="flex flex-col w-40 text-textGray text-[17px]">
            <a
                href={pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded shadow h-55 w-40 border border-gray-200"
            >
                <Document file={pdfPath} className="w-full h-full object-cover">
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