import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#000000",
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.45,
  },
  name: { fontSize: 20, textAlign: "center", fontWeight: "bold", marginBottom: 2 },
  title: { fontSize: 12, textAlign: "center", marginBottom: 6 },
  contact: { fontSize: 10, textAlign: "center", marginBottom: 12 },
  section: { marginBottom: 12 },
  heading: { fontSize: 12, marginBottom: 6, textDecoration: "underline", fontWeight: "bold" },
  subheading: { fontSize: 11, fontWeight: "bold", marginBottom: 2 },
  text: { fontSize: 10, marginBottom: 2 },
  link: { color: "#0000EE", textDecoration: "underline" },
  row: { display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 16 },
  col: { width: "48%" },
});

export default function ResumePDF({ lang }: { lang: "en" | "de" }) {
  const isGerman = lang === "de";

  const info = {
    name: "Bishwajit Karmaker",
    title: isGerman ? "Junior Full-Stack Webentwickler" : "Junior Full-Stack Developer",
    location: isGerman ? "Berlin, Deutschland" : "Berlin, Germany",
    phone: "+49 1556 6062930",
    email: "contact@abdullahstack.com",
    website: "https://abdullahstack.com",
    linkedin: "https://www.linkedin.com/in/bishwajit-karmaker/",
    github: "https://github.com/Bishwajit93",
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.name}>{info.name}</Text>
        <Text style={styles.title}>{info.title}</Text>
        <Text style={styles.contact}>
          {info.location} • {info.phone} • {info.email} {"\n"}
          <Link src={info.website} style={styles.link}>abdullahstack.com</Link> •{" "}
          <Link src={info.github} style={styles.link}>GitHub</Link> •{" "}
          <Link src={info.linkedin} style={styles.link}>LinkedIn</Link>
        </Text>

        {/* Profile */}
        <Section title={isGerman ? "Profil" : "Profile"}>
          <Text style={styles.text}>
            {isGerman
              ? "Autodidaktischer Full-Stack-Entwickler mit Praxis in Django, Next.js, Tailwind CSS und PostgreSQL. Sauberer, wartbarer Code, funktionale Features, kontinuierliches Lernen. Mehrere reale Projekte mit End-to-End-Verantwortung (inkl. Deployment)."
              : "Self-taught full-stack developer with hands-on experience in Django, Next.js, Tailwind CSS, and PostgreSQL. Clean, maintainable code, functional features, and continuous learning. Delivered several real-world projects end-to-end, including deployment."}
          </Text>
        </Section>

        {/* Projects */}
        <Section title={isGerman ? "Projekte" : "Projects"}>
          <Text style={styles.subheading}>
            {isGerman ? "Portfolio-Website (2025)" : "Portfolio Website (2025)"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Django, PostgreSQL, Next.js, Tailwind. JWT-Auth, CRUD, Resend API, responsives Dark-UI."
              : "Django, PostgreSQL, Next.js, Tailwind. JWT auth, CRUD, Resend API, responsive dark UI."}
          </Text>
          <Text style={styles.text}>
            {isGerman ? "Live:" : "Live:"}{" "}
            <Link src={info.website} style={styles.link}>
              abdullahstack.com
            </Link>
          </Text>

          <Text style={[styles.subheading, { marginTop: 6 }]}>
            {isGerman ? "Linda Art Gallery (2025)" : "Linda Art Gallery (2025)"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Plattform für eine Künstlerin: Galerie (Bilder/Videos), Preis-Anfragen, responsive Layout. Backend: Django REST; Frontend: Next.js & Tailwind; Deployment: Vercel & Railway."
              : "Platform for a Berlin-based artist: image/video gallery, price request contact flow, responsive layout. Backend: Django REST; Frontend: Next.js & Tailwind; Deployment: Vercel & Railway."}
          </Text>
        </Section>

        {/* Work Experience */}
        <Section title={isGerman ? "Berufserfahrung" : "Work Experience"}>
          <Text style={styles.subheading}>
            {isGerman
              ? "2024–heute — Sport Voswinkel GmbH, Berlin"
              : "2024–Present — Sport Voswinkel GmbH, Berlin"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Kundenberatung, Lagerorganisation, SAP; effiziente Abläufe im Team und eigenständig."
              : "Customer service, inventory operations, SAP; efficient processes in team-based and solo work."}
          </Text>

          <Text style={[styles.subheading, { marginTop: 4 }]}>
            {isGerman ? "2021–2022 — Flink SE, Berlin" : "2021–2022 — Flink SE, Berlin"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Kommissionierung, Lagerorganisation, Produkthandling; sichere, zügige Arbeitsweise im KPI-Umfeld."
              : "Order picking, inventory organization, product handling; safe, fast operations in a KPI-driven setting."}
          </Text>

          <Text style={[styles.subheading, { marginTop: 4 }]}>
            {isGerman
              ? "2019–2024 — Küchenhilfe, verschiedene Restaurants (Berlin)"
              : "2019–2024 — Kitchen Assistant, various restaurants (Berlin)"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Unterstützung in Küche/Service, Hygiene & Schichtbetrieb; Belastbarkeit und Teamarbeit."
              : "Supported kitchen/service, hygiene & shift work; resilience and teamwork in fast-paced settings."}
          </Text>
        </Section>

        {/* Education */}
        <Section title={isGerman ? "Bildung" : "Education"}>
          <Text style={styles.subheading}>
            2013–2018 — {isGerman ? "BSc Mathematik, BRAC University, Dhaka" : "BSc Mathematics, BRAC University, Dhaka"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Starke Grundlagen in Logik und strukturiertem Problemlösen."
              : "Strong foundation in logic and structured problem-solving."}
          </Text>

          <Text style={[styles.subheading, { marginTop: 4 }]}>
            2021–2025 — {isGerman ? "MSc Scientific Computing, TU Berlin (nicht abgeschlossen)" : "MSc Scientific Computing, TU Berlin (not completed)"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Fokus auf Programmierung und angewandte Informatik; später Wechsel zu praxisnaher Entwicklung."
              : "Focus on programming and applied CS; later shifted fully to hands-on development."}
          </Text>
        </Section>

        {/* Certifications */}
        <Section title={isGerman ? "Zertifikate" : "Certifications"}>
          <Text style={styles.text}>
            {isGerman
              ? "2021 — Full-Stack Webentwicklungs-Bootcamp (HTML, CSS, JavaScript, React, Backend-Grundlagen). Fundament für Django & PostgreSQL."
              : "2021 — Full-Stack Web Development Bootcamp (HTML, CSS, JavaScript, React, backend fundamentals). Foundation for Django & PostgreSQL."}
          </Text>
        </Section>

        {/* Technical Skills */}
        <Section title={isGerman ? "Technische Kenntnisse" : "Technical Skills"}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.subheading}>{isGerman ? "Sprachen" : "Languages"}</Text>
              <Text style={styles.text}>Python, JavaScript, TypeScript</Text>

              <Text style={[styles.subheading, { marginTop: 6 }]}>{isGerman ? "Frameworks" : "Frameworks"}</Text>
              <Text style={styles.text}>Django, DRF, React, Next.js, Tailwind CSS</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.subheading}>{isGerman ? "Datenbanken" : "Databases"}</Text>
              <Text style={styles.text}>PostgreSQL</Text>

              <Text style={[styles.subheading, { marginTop: 6 }]}>{isGerman ? "Tools" : "Tools"}</Text>
              <Text style={styles.text}>Git/GitHub, Railway, Vercel, Bunny, SAP, Ubuntu, VS Code</Text>
            </View>
          </View>
        </Section>

        {/* Languages */}
        <Section title={isGerman ? "Sprachen" : "Languages"}>
          <Text style={styles.text}>{isGerman ? "Englisch — fließend" : "English — fluent"}</Text>
          <Text style={styles.text}>{isGerman ? "Deutsch — Mittelstufe (B1/B2)" : "German — intermediate (B1/B2)"}</Text>
          <Text style={styles.text}>{isGerman ? "Bengalisch — Muttersprache" : "Bengali — native"}</Text>
        </Section>

        {/* Personal Strengths */}
        <Section title={isGerman ? "Persönliche Stärken" : "Personal Strengths"}>
          <Text style={styles.text}>
            {isGerman
              ? "Teamfähigkeit • Zuverlässigkeit • Belastbarkeit • Selbstmotivation • Lernbereitschaft"
              : "Teamwork • Reliability • Resilience • Self-motivation • Willingness to learn"}
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
