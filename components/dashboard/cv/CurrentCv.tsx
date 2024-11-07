'use client';

import { Document, Page } from 'react-pdf';
import { Card, CardContent } from '@/components/ui/card';
import ErrorMessage from '@/components/ErrorMessage';
import useCvStore from '@/store/useCvStore';
import { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function CurrentCV() {
  const fetchCV = useCvStore((state) => state.fetchCV);
  const cv = useCvStore((state) => state.cv);
  const error = useCvStore((state) => state.error);
  const [pageWidth, setPageWidth] = useState(600);

  useEffect(() => {
    fetchCV();
  }, [fetchCV]);

  useEffect(() => {
    const updatePageWidth = () => {
      const cardWidth = document.querySelector('.pdf-container')?.clientWidth;
      setPageWidth(cardWidth ? Math.min(cardWidth - 40, 800) : 600);
    };

    window.addEventListener('resize', updatePageWidth);
    updatePageWidth();

    return () => window.removeEventListener('resize', updatePageWidth);
  }, []);

  if (error && error.fetch) {
    return <ErrorMessage errorMessage={error?.message} />;
  }

  if (!cv) {
    return <ErrorMessage errorMessage="Aucun CV trouvé" />;
  }

  return (
    <Card className="mt-4">
      <CardContent className="p-6">
        <p className="mb-4 text-sm text-gray-500">
          Téléchargé le : {new Date(cv.uploadedAt).toLocaleDateString()}
        </p>
        <div className="flex justify-center pdf-container">
          <Document
            file={cv.filePath}
            className="max-w-full"
            error={<ErrorMessage errorMessage="Erreur lors du chargement du PDF." />}
            loading={<div className="text-center">Chargement du PDF...</div>}
          >
            <Page
              pageNumber={1}
              width={pageWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </CardContent>
    </Card>
  );
}
