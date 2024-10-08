"use client";

import { useState, useEffect } from "react";
import type { CV } from "@/types/portfolio";
import CVManager from "@/components/dashboard/cv/CvManager";

export default function CVPage() {
  const [cv, setCV] = useState<CV | null>(null);

  useEffect(() => {
    // TODO: Remplacer ceci par un appel à l'API pour récupérer les données du CV
    setCV({
      id: 1,
      filePath: "/cv/CV_SAMUEL_MOULINET_2024.pdf",
      uploadDate: new Date().toISOString(),
    });
  }, []);

  const handleDeleteCV = async () => {
    try {
      // TODO: Appel API pour supprimer le CV
      // await deleteCV(cv.id);
      setCV(null);
      console.log("CV supprimé");
    } catch (error) {
      console.error("Erreur lors de la suppression du CV:", error);
    }
  };

  const handleUploadCV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Simuler le téléchargement et la mise à jour du CV
        const newCV: CV = {
          id: Date.now(),
          filePath: "/cv/CV_SAMUEL_MOULINET_2024.pdf", // On garde le même nom de fichier pour la simulation
          uploadDate: new Date().toISOString(),
        };
        setCV(newCV);
        console.log("Nouveau CV téléchargé:", file.name);
      } catch (error) {
        console.error("Erreur lors du téléchargement du CV:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Gestion du CV</h1>
      <CVManager cv={cv} onDelete={handleDeleteCV} onUpload={handleUploadCV} />
    </div>
  );
}
