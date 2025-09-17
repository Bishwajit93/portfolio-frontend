"use client";

import { useCallback } from "react";
import { pdf } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";

export default function ResumeDownloadButton({ lang }: { lang: "en" | "de" }) {
  const handleDownload = useCallback(async () => {
    // Force a fresh tree render per language using `key={lang}`
    const blob = await pdf(<ResumePDF key={lang} lang={lang} />).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Resume_Bishwajit_Karmaker_${lang.toUpperCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }, [lang]);

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 text-sm font-semibold text-cyan-300 border border-cyan-400 rounded-md hover:bg-cyan-500/10 hover:text-white cursor-pointer"
      style={{ cursor: "pointer", boxShadow: "0 0 8px rgba(0,255,255,0.4)" }}
    >
      Download PDF
    </button>
  );
}
