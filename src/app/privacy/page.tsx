"use client";

import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";

export default function PrivacyPage() {
  return (
    <AnimatedPageWrapper key="privacy">
      <main className="min-h-screen text-white pt-[60px] pb-[80px] px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
          {/* Hero header box */}
          <section>
            <div className="hero-shell px-6 py-7 md:px-10 md:py-9">
              <div className="space-y-3">
                <p className="text-[12px] uppercase tracking-[0.22em] text-cyan-200 drop-shadow-[0_0_4px_rgba(34,211,238,0.6)]">
                  Datenschutz
                </p>
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-cyan-50">
                  Privacy Policy
                </h1>
                <p className="text-sm md:text-base text-cyan-100/85 max-w-2xl">
                  Diese Datenschutzerklärung informiert Sie darüber, welche
                  personenbezogenen Daten beim Besuch dieser Portfolio-Website
                  verarbeitet werden und welche Rechte Sie in diesem Zusammenhang haben.
                </p>
              </div>
            </div>
          </section>

          {/* Content cards */}
          <section className="space-y-6 md:space-y-7">
            {/* Verantwortlicher */}
            <div className="glass-card px-6 py-5 md:px-8 md:py-6 space-y-3">
              <h2 className="text-lg md:text-xl text-cyan-300">
                1. Verantwortlicher
              </h2>
              <p className="text-sm text-cyan-100/90 leading-relaxed">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="text-sm text-cyan-100/95 leading-relaxed">
                <span className="font-semibold">Bishwajit Karmaker</span>
                <br />
                Wönnichstraße 03
                <br />
                10317 Berlin
                <br />
                Deutschland
                <br />
                E-Mail:{" "}
                <a
                  href="mailto:contact@abdullahstack.com"
                  className="text-cyan-300 hover:text-cyan-100 underline underline-offset-4"
                >
                  contact@abdullahstack.com
                </a>
              </p>
            </div>

            {/* Server-Logs */}
            <div className="glass-card px-6 py-5 md:px-8 md:py-6 space-y-3">
              <h2 className="text-lg md:text-xl text-cyan-300">
                2. Server-Logfiles
              </h2>
              <p className="text-sm text-cyan-100/90 leading-relaxed">
                Beim Aufruf dieser Website werden durch den Hosting-Provider
                automatisch Informationen in sogenannten Server-Logfiles erhoben
                und gespeichert. Dazu können gehören:
              </p>
              <ul className="list-disc list-inside text-sm text-cyan-100/90 space-y-1">
                <li>IP-Adresse (in gekürzter Form)</li>
                <li>Datum und Uhrzeit der Anfrage</li>
                <li>abgerufene Seite / Datei</li>
                <li>verwendeter Browser und Betriebssystem</li>
              </ul>
              <p className="text-sm text-cyan-100/90 leading-relaxed">
                Diese Daten dienen ausschließlich der Sicherstellung eines
                störungsfreien Betriebs der Website (Art. 6 Abs. 1 lit. f DSGVO)
                und werden nicht dazu verwendet, Sie persönlich zu identifizieren.
              </p>
            </div>

            {/* Kontaktformular */}
            <div className="glass-card px-6 py-5 md:px-8 md:py-6 space-y-3">
              <h2 className="text-lg md:text-xl text-cyan-300">
                3. Kontaktaufnahme
              </h2>
              <p className="text-sm text-cyan-100/90 leading-relaxed">
                Wenn Sie mich über das Kontaktformular oder per E-Mail
                kontaktieren, werden die von Ihnen eingegebenen Daten (z.&nbsp;B.
                Name, E-Mail-Adresse und Nachricht) ausschließlich zur Bearbeitung
                Ihrer Anfrage verwendet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO,
                sofern es um vorvertragliche oder vertragliche Anfragen geht, ansonsten
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
              </p>
            </div>

            {/* Speicherung / Löschung */}
            <div className="glass-card px-6 py-5 md:px-8 md:py-6 space-y-3">
              <h2 className="text-lg md:text-xl text-cyan-300">
                4. Speicherdauer
              </h2>
              <p className="text-sm text-cyan-100/90 leading-relaxed">
                Personenbezogene Daten werden nur so lange gespeichert, wie es
                für den jeweiligen Zweck erforderlich ist oder gesetzliche
                Aufbewahrungspflichten bestehen. Danach werden die Daten gelöscht
                oder anonymisiert.
              </p>
            </div>

            {/* Rechte der betroffenen Person */}
            <div className="glass-card px-6 py-5 md:px-8 md:py-6 space-y-3">
              <h2 className="text-lg md:text-xl text-cyan-300">
                5. Ihre Rechte
              </h2>
              <p className="text-sm text-cyan-100/90 leading-relaxed">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen das Recht auf:
              </p>
              <ul className="list-disc list-inside text-sm text-cyan-100/90 space-y-1">
                <li>Auskunft über Ihre gespeicherten personenbezogenen Daten,</li>
                <li>Berichtigung unrichtiger Daten,</li>
                <li>Löschung Ihrer Daten, soweit keine gesetzlichen Pflichten entgegenstehen,</li>
                <li>Einschränkung der Verarbeitung,</li>
                <li>Widerspruch gegen bestimmte Verarbeitungen,</li>
                <li>Datenübertragbarkeit.</li>
              </ul>
              <p className="text-sm text-cyan-100/90 leading-relaxed">
                Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten
                können Sie sich jederzeit unter der oben angegebenen Kontaktadresse an mich wenden.
              </p>
            </div>

            {/* Aufsichtsbehörde */}
            <div className="glass-card px-6 py-5 md:px-8 md:py-6 space-y-3">
              <h2 className="text-lg md:text-xl text-cyan-300">
                6. Beschwerderecht
              </h2>
              <p className="text-sm text-cyan-100/90 leading-relaxed">
                Sie haben zudem das Recht, sich bei einer zuständigen
                Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer
                personenbezogenen Daten zu beschweren.
              </p>
            </div>
          </section>
        </div>
      </main>
    </AnimatedPageWrapper>
  );
}
