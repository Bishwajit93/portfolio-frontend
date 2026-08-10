"use client";

export default function ResumeDownloadButton({ lang }: { lang: "en" | "de" }) {
  const href = lang === "de"
    ? "/resume/Karmaker_Bishwajit_Lebenslauf.pdf"
    : "/resume/Karmaker_Bishwajit_Resume.pdf";

  return (
    <a className="resume-download" href={href} download>
      <span>{lang === "de" ? "PDF herunterladen" : "Download PDF"}</span>
      <strong>↓</strong>
    </a>
  );
}
