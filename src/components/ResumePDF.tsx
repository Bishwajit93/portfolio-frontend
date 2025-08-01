import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

// Base style
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: 11,
    padding: 40,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  name: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 2,
    fontWeight: "bold",
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 6,
  },
  contact: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 10,
  },
  section: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 12,
    marginBottom: 4,
    textDecoration: "underline",
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
  },
  text: {
    fontSize: 10,
    marginBottom: 2,
  },
  bullet: {
    fontSize: 10,
    marginBottom: 2,
    marginLeft: 12,
  },
  columnWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  col: {
    width: "48%",
  },
  link: {
    color: "#0000EE",
    textDecoration: "underline",
  },
});

export default function ResumePDF({ lang }: { lang: "en" | "de" }) {
  const info = {
    name: "Bishwajit Karmaker",
    title: "Full-Stack Web Developer",
    location: "Berlin, Germany",
    phone: "+49 1556 6062930",
    email: "contact@abdullahstack.com",
    website: "https://abdullahstack.com",
    linkedin: "https://www.linkedin.com/in/bishwajit-karmaker",
    github: "https://github.com/Bishwajit93",
  };

  const isGerman = lang === "de";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{info.name}</Text>
        <Text style={styles.title}>{info.title}</Text>
        <Text style={styles.contact}>
          {info.location} • {info.phone} • {info.email} {"\n"}
          <Link src={info.website} style={styles.link}>abdullahstack.com</Link> •{" "}
          <Link src={info.linkedin} style={styles.link}>LinkedIn</Link> •{" "}
          <Link src={info.github} style={styles.link}>GitHub</Link>
        </Text>

        {/* Sections */}
        <Section title={isGerman ? "Profil" : "Professional Summary"}>
          <Text style={styles.text}>
            {isGerman
              ? "Autodidaktischer Full-Stack-Webentwickler mit praktischer Erfahrung in der Erstellung von Webanwendungen mit Django, PostgreSQL, React, Next.js und Tailwind CSS. Fokus auf sauberem Code, funktionale Features und kontinuierliches Lernen. Ich wechsle derzeit vom Einzelhandel in die Tech-Branche und bringe Disziplin, Teamgeist und reale Lebenserfahrung mit."
              : "Self-taught full-stack developer with practical experience building web applications using Django, PostgreSQL, React, Next.js, and Tailwind CSS. Focused on clean code, functional features, and continuous learning. Transitioning from retail to tech, bringing strong discipline, teamwork, and real-world experience."}
          </Text>
        </Section>

        <Section title={isGerman ? "Technische Kenntnisse" : "Technical Skills"}>
          <View style={styles.columnWrap}>
            <View style={styles.col}>
              <Text style={styles.subheading}>
                {isGerman ? "Sprachen & Frameworks" : "Languages & Frameworks"}
              </Text>
              <Text style={styles.text}>
                Python ({isGerman ? "Fortgeschritten" : "Intermediate"}){"\n"}
                JavaScript ({isGerman ? "Grundkenntnisse" : "Basic"}), TypeScript ({isGerman ? "Einsteiger" : "Beginner"}){"\n"}
                Django, DRF, React, Next.js
              </Text>

              <Text style={[styles.subheading, { marginTop: 8 }]}>
                {isGerman ? "Tools & Plattformen" : "Tools & Platforms"}
              </Text>
              <Text style={styles.text}>
                Git, GitHub, VS Code, Railway, Vercel, Resend API{"\n"}
                SAP ({isGerman ? "Grundkenntnisse" : "Basic"}), Ubuntu Server
              </Text>
            </View>

            <View style={styles.col}>
              <Text style={styles.subheading}>
                {isGerman ? "Backend & Datenbanken" : "Backend & Database"}
              </Text>
              <Text style={styles.text}>
                PostgreSQL, SQLite{"\n"}
                REST APIs, JWT {isGerman ? "Authentifizierung" : "Auth"}
              </Text>

              <Text style={[styles.subheading, { marginTop: 8 }]}>
                {isGerman ? "Frontend & Design" : "Frontend & Styling"}
              </Text>
              <Text style={styles.text}>
                HTML, CSS, Tailwind CSS{"\n"}
                {isGerman ? "Responsives Design" : "Responsive Design"}
              </Text>
            </View>
          </View>
        </Section>

        <Section title={isGerman ? "Projekte" : "Projects"}>
          <Text style={styles.subheading}>{isGerman ? "2024 – Portfolio-Website" : "2024 – Portfolio Website"}</Text>
          <Text style={styles.text}>
            {isGerman
              ? "Vollständige persönliche Portfolio-Website mit Django, PostgreSQL, React, Next.js und Tailwind CSS. Beinhaltet Authentifizierung (JWT), CRUD-Funktionen, E-Mail-Integration (Resend API) und ein responsives, dunkles UI-Design."
              : "Full-stack personal portfolio built with Django, PostgreSQL, React, Next.js, and Tailwind CSS. Includes authentication (JWT), CRUD features, Resend API integration, and a fully responsive dark-themed UI."}
          </Text>
          <Text style={styles.text}>
            Live: <Link src={info.website} style={styles.link}>{info.website}</Link>
          </Text>
        </Section>

        <Section title={isGerman ? "Zertifikate" : "Certifications"}>
          <Text style={styles.text}>
            {isGerman
              ? "2021 Full-Stack Webentwicklungs-Bootcamp – Inhalte: HTML, CSS, JavaScript, React und Backend-Grundlagen. Legte das Fundament für meine Kenntnisse in Django und PostgreSQL."
              : "2021 Full-Stack Web Development Bootcamp — Covered HTML, CSS, JavaScript, React, and backend principles. Built the foundation for Django and PostgreSQL skills."}
          </Text>
        </Section>

        <Section title={isGerman ? "Ausbildung" : "Education"}>
          <Text style={styles.subheading}>
            2013–2018 – BSc {isGerman ? "in Mathematik" : "in Mathematics"}, BRAC University, Dhaka
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Starke Grundlagen in Logik und strukturiertem Problemlösen."
              : "Strong foundation in logic and structured problem-solving."}
          </Text>
          <Text style={styles.subheading}>
            2021–2025 – MSc {isGerman ? "(nicht abgeschlossen)" : "(Not Completed)"}, TU Berlin
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Studium begann an der Hochschule Mittweida und TU Kaiserslautern, später Wechsel zur TU Berlin. Fokus nun auf praxisorientierter Entwicklung."
              : "Initially studied at Hochschule Mittweida and TU Kaiserslautern, later transferred to TU Berlin. Shifted focus to full-time practical development."}
          </Text>
        </Section>

        <Section title={isGerman ? "Berufserfahrung" : "Work Experience"}>
          <Text style={styles.subheading}>
            {isGerman
              ? "2024–heute – Lagerist, Intersport, Berlin"
              : "2024–Present – Warehouse Associate, Intersport, Berlin"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Verwaltung von Lagerbeständen mit SAP; Kundenbetreuung auf der Verkaufsfläche; Teamarbeit und Verantwortungsbewusstsein."
              : "Managed inventory and logistics using SAP; assisted customers on the sales floor; strong teamwork and responsibility."}
          </Text>

          <Text style={styles.subheading}>
            {isGerman
              ? "2021–2022 – Lagerhelfer, Flink, Berlin"
              : "2021–2022 – Warehouse Associate, Flink, Berlin"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Unterstützung bei der Kommissionierung, Lagerorganisation und Produktauffüllung in einem schnelllebigen Lagerumfeld. Einhaltung von Sicherheitsvorgaben, selbstständig und im Team."
              : "Assisted with order picking, inventory organization, and product restocking. Maintained cleanliness, followed safety procedures, and supported both independent and team-based daily operations."}
          </Text>

          <Text style={styles.subheading}>
            {isGerman
              ? "2019–2023 – Küchenhilfe, Verschiedene Restaurants"
              : "2019–2023 – Kitchen Assistant, Various Restaurants"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Arbeit in schnelllebigen Küchen mit Verantwortung für Vorbereitung, Hygiene und Zusammenarbeit."
              : "Worked in fast-paced kitchens supporting food preparation and hygiene. Built discipline, stress management, and teamwork."}
          </Text>
        </Section>

        <Section title={isGerman ? "Sprachen" : "Languages"}>
          <Text style={styles.text}>
            {isGerman ? "Englisch – Fließend" : "English – Fluent"}
          </Text>
          <Text style={styles.text}>
            {isGerman ? "Deutsch – Konversationssicher" : "German – Conversational"}
          </Text>
        </Section>

        <Section title={isGerman ? "Persönliche Eigenschaften" : "Personal Qualities"}>
          <Text style={styles.text}>• {isGerman ? "Verantwortungsbewusst und zuverlässig" : "Strong sense of responsibility and reliability"}</Text>
          <Text style={styles.text}>• {isGerman ? "Teamfähig, freundlich und respektvoll" : "Friendly, respectful, and team-oriented"}</Text>
          <Text style={styles.text}>• {isGerman ? "Lernbereit und offen für Feedback" : "Open-minded and always willing to learn"}</Text>
          <Text style={styles.text}>• {isGerman ? "Belastbar in Stresssituationen" : "Calm under pressure and honest communicator"}</Text>
          <Text style={styles.text}>• {isGerman ? "Motiviert durch Sinn, nicht nur Leistung" : "Motivated by purpose, not just performance"}</Text>
        </Section>

        <Section title={isGerman ? "Hinweis" : "Note"}>
          <Text style={styles.text}>
            {isGerman
              ? "Dieser Lebenslauf sowie die Portfolio-Website wurden vollständig von mir selbst erstellt, gepflegt und bereitgestellt – als Teil meines persönlichen und beruflichen Entwicklungsweges."
              : "This CV and portfolio site were fully self-built, maintained, and deployed by me as part of my personal and professional growth journey."}
          </Text>
        </Section>
      </Page>
    </Document>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>
      {children}
    </View>
  );
}
