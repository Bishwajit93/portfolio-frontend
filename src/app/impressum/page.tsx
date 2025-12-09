"use client";

import AnimatedPageWrapper from "@/components/AnimatedPageWrapper";

export default function ImpressumPage() {
  return (
    <AnimatedPageWrapper key="impressum">
      <main className="min-h-screen text-white pt-[60px] pb-[80px] px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
          {/* Hero header box */}
          <section>
            <div className="hero-shell px-6 py-7 md:px-10 md:py-9">
              <div className="space-y-3">
                <p className="text-[12px] uppercase tracking-[0.22em] text-cyan-200 drop-shadow-[0_0_4px_rgba(34,211,238,0.6)]">
                  Rechtliche Angaben
                </p>
                <h1>Imprint (Legal Notice)</h1>
                <p className="text-sm md:text-base text-cyan-100/85 max-w-2xl">
                  Nachfolgend finden Sie die gesetzlich erforderlichen Angaben
                  gemäß § 5 TMG sowie die verantwortliche Person nach § 18 Abs. 2 MStV
                  für diese persönliche Portfolio-Website.
                </p>
              </div>
            </div>
          </section>

          {/* Content cards */}
          <section className="space-y-6 md:space-y-7">
            {/* Anschrift + Kontakt */}
            <div className="glass-card px-6 py-5 md:px-8 md:py-6 space-y-3">
              <h2 className="text-lg md:text-xl text-cyan-300">
                Anbieter dieser Website
              </h2>
              <p className="text-sm text-cyan-100/90">
                Angaben gemäß § 5 TMG und Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:
              </p>
              <p className="text-sm text-cyan-100/95 leading-relaxed">
                <span className="font-semibold">Bishwajit Karmaker</span>
                <br />
                Wönnichstraße 03
                <br />
                10317 Berlin
                <br />
                Deutschland
              </p>
              <p className="text-sm text-cyan-100/95">
                <span className="font-semibold">Kontakt:</span>
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

            {/* Haftung für Inhalte */}
            <div className="glass-card px-6 py-5 md:px-8 md:py-6 space-y-3">
              <h2 className="text-lg md:text-xl text-cyan-300">
                Haftung für Inhalte
              </h2>
              <p className="text-sm text-cyan-100/90 leading-relaxed">
                Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                kann jedoch keine Gewähr übernommen werden. Als Diensteanbieter
                bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG
                bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte
                oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>

            {/* Haftung für Links */}
            <div className="glass-card px-6 py-5 md:px-8 md:py-6 space-y-3">
              <h2 className="text-lg md:text-xl text-cyan-300">
                Haftung für Links
              </h2>
              <p className="text-sm text-cyan-100/90 leading-relaxed">
                Diese Website enthält Links zu externen Webseiten Dritter, auf deren
                Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden
                Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
                Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
                Bei Bekanntwerden von Rechtsverletzungen werden derartige Links
                umgehend entfernt.
              </p>
            </div>

            {/* Urheberrecht */}
            <div className="glass-card px-6 py-5 md:px-8 md:py-6 space-y-3">
              <h2 className="text-lg md:text-xl text-cyan-300">
                Urheberrecht
              </h2>
              <p className="text-sm text-cyan-100/90 leading-relaxed">
                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen
                Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind
                als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
                Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
                Autors oder Erstellers. Downloads und Kopien dieser Seite sind nur
                für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
            </div>
          </section>
        </div>
      </main>
    </AnimatedPageWrapper>
  );
}
