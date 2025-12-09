"use client";

import { useCallback } from "react";
import { pdf } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";

export default function ResumeDownloadButton({ lang }: { lang: "en" | "de" }) {
  const handleDownload = useCallback(async () => {
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
      className="inline-flex items-center justify-center px-5 py-2.5 rounded-full 
                 border border-cyan-400/90 bg-cyan-500/20 
                 text-xs md:text-sm text-cyan-50 
                 shadow-[0_0_20px_rgba(34,211,238,0.8)] 
                 hover:bg-cyan-500/30 hover:shadow-[0_0_28px_rgba(34,211,238,1)] 
                 transition cursor-pointer"
    >
      {lang === "de" ? "PDF herunterladen" : "Download PDF"}
    </button>
  );
}
