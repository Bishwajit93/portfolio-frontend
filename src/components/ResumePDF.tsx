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
  name: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 6,
  },
  contact: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 12,
  },
  section: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 12,
    marginBottom: 6,
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
  link: {
    color: "#0000EE",
    textDecoration: "underline",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  col: {
    width: "48%",
  },
});

export default function ResumePDF({ lang }: { lang: "en" | "de" }) {
  const isGerman = lang === "de";

  const info = {
    name: "Bishwajit Karmaker",
    title: isGerman
      ? "Full-Stack Webentwickler"
      : "Full-Stack Web Developer",
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
          {info.location} • {info.phone} • {info.email}
          {"\n"}
          <Link src={info.website} style={styles.link}>
            abdullahstack.com
          </Link>{" "}
          •{" "}
          <Link src={info.github} style={styles.link}>
            github.com/Bishwajit93
          </Link>{" "}
          •{" "}
          <Link src={info.linkedin} style={styles.link}>
            linkedin.com/in/bishwajit-karmaker
          </Link>
        </Text>

        {/* Profile */}
        <PDFSection title={isGerman ? "Profil" : "Profile"}>
          <Text style={styles.text}>
            {isGerman
              ? "Autodidaktischer Full-Stack-Webentwickler mit Erfahrung in der Entwicklung, Bereitstellung und Wartung moderner Webanwendungen. Fundiertes Wissen in Django, Django REST Framework, Next.js, Tailwind CSS und PostgreSQL. Übernimmt Verantwortung für komplette Entwicklungsprozesse – von Konzeption über Backend- und Frontend-Entwicklung bis hin zum Deployment. Bringt Zuverlässigkeit, Lernbereitschaft und lösungsorientiertes Arbeiten aus langjähriger Berufserfahrung mit."
              : "Self-taught Full-Stack Web Developer with strong experience in building, deploying, and maintaining modern web applications. Skilled in Django, Django REST Framework, Next.js, Tailwind CSS, and PostgreSQL. Capable of taking full ownership of projects from concept to production, with a focus on clean code, scalability, and user-friendly design, backed by years of professional work experience."}
          </Text>
        </PDFSection>

        {/* Projects */}
        <PDFSection title={isGerman ? "Projekte" : "Projects"}>
          <Text style={styles.subheading}>
            {isGerman ? "Portfolio Website (2025)" : "Portfolio Website (2025)"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Full-Stack-Portfolio mit Django, PostgreSQL, Next.js und Tailwind CSS. Enthält JWT-Authentifizierung, vollständige CRUD-Funktionen, Projekt- und Erfahrungsverwaltung sowie ein integriertes Kontaktformular mit der Resend API. Responsives Dark-UI, bereitgestellt über Vercel (Frontend) und Railway (Backend)."
              : "Full-stack portfolio platform built with Django, PostgreSQL, Next.js, and Tailwind CSS. Includes JWT authentication, complete CRUD functionality, project and experience management, and an integrated contact system using the Resend API. Fully responsive dark UI deployed on Vercel (frontend) and Railway (backend)."}
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
              ? "Individuelle Kunstgalerie- und Portfolio-Plattform für eine Berliner Künstlerin. Funktionen: dynamische Bild- und Videoverwaltung, Preisanfrageformular mit automatisierten E-Mails, responsives Layout und JWT-basierte Authentifizierung. Backend mit Django REST Framework, Frontend mit Next.js und Tailwind CSS, Deployment über Vercel und Railway."
              : "Custom portfolio and gallery platform for a Berlin-based artist. Features: dynamic image and video galleries, artwork inquiry form with automated emails, responsive layouts, and secure JWT-based authentication. Backend built with Django REST Framework, frontend with Next.js and Tailwind CSS, deployed on Vercel and Railway."}
          </Text>
        </PDFSection>

        {/* Work Experience */}
        <PDFSection
          title={isGerman ? "Berufserfahrung" : "Work Experience"}
        >
          <Text style={styles.subheading}>
            {isGerman
              ? "Einzelhandelsmitarbeiter – Sport Voswinkel GmbH, Berlin (2024–heute)"
              : "Retail Associate – Sport Voswinkel GmbH, Berlin (2024–Present)"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Kundenbetreuung, Waren- und Lagerverwaltung mittels SAP und digitaler Systeme. Optimierung von Arbeitsabläufen, präzise Organisation und zuverlässige Zusammenarbeit im Team. Stärkung von Verantwortungsbewusstsein, Zeitmanagement und Kommunikationsfähigkeit."
              : "Customer support, merchandise management, and inventory operations using SAP and digital systems. Improved workflow structure, accuracy, and coordination in a fast-paced environment. Developed strong reliability, time management, and communication skills."}
          </Text>

          <Text style={[styles.subheading, { marginTop: 4 }]}>
            {isGerman
              ? "Lagerhelfer – Flink SE, Berlin (2021–2022)"
              : "Warehouse Associate – Flink SE, Berlin (2021–2022)"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Kommissionierung, Bestandskontrolle und Lagerprozesse unter Zeitdruck. Hohe Genauigkeit, Teamarbeit und effizientes Arbeiten in dynamischen Situationen."
              : "Handled order preparation, stock control, and warehouse processes under time pressure. Strengthened teamwork, efficiency, and attention to detail in dynamic situations."}
          </Text>

          <Text style={[styles.subheading, { marginTop: 4 }]}>
            {isGerman
              ? "Küchenhilfe – Verschiedene Restaurants (Berlin) (2019–2024)"
              : "Kitchen Assistant – Multiple Restaurants (Berlin) (2019–2024)"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Arbeit in schnelllebigen, multikulturellen Küchenumgebungen. Einhaltung von Hygiene- und Sicherheitsstandards, Teamkoordination und Zuverlässigkeit während hoher Arbeitsbelastung."
              : "Worked in fast-paced, multicultural kitchen environments. Maintained hygiene and safety standards, coordinated with teams, and delivered reliable performance during peak workload."}
          </Text>
        </PDFSection>

        {/* Education */}
        <PDFSection title={isGerman ? "Bildung" : "Education"}>
          <Text style={styles.subheading}>
            {isGerman
              ? "M.Sc. Scientific Computing – Technische Universität Berlin (2021–2024, nicht abgeschlossen)"
              : "M.Sc. Scientific Computing – Technische Universität Berlin (2021–2024, not completed)"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Vertiefung in Programmierung und angewandter Informatik; später Fokuswechsel auf praxisnahe Webentwicklung und eigene Projekte."
              : "Focused on programming and applied scientific computing; later shifted fully towards practical web development and independent projects."}
          </Text>

          <Text style={[styles.subheading, { marginTop: 4 }]}>
            {isGerman
              ? "B.Sc. Mathematik – BRAC University, Dhaka (2013–2018)"
              : "B.Sc. Mathematics – BRAC University, Dhaka (2013–2018)"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Fundierte mathematische Grundlagen in Logik, Analyse und Problemlösung."
              : "Strong mathematical foundation in logic, analysis, and problem-solving."}
          </Text>
        </PDFSection>

        {/* Technical Skills */}
        <PDFSection
          title={isGerman ? "Technische Kenntnisse" : "Technical Skills"}
        >
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.subheading}>
                {isGerman
                  ? "Programmiersprachen & Frameworks"
                  : "Languages & Frameworks"}
              </Text>
              <Text style={styles.text}>
                Python, JavaScript, TypeScript
              </Text>
              <Text style={styles.text}>
                Django, Django REST Framework
              </Text>
              <Text style={styles.text}>
                React, Next.js, Tailwind CSS
              </Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.subheading}>
                {isGerman
                  ? "Datenbanken & Tools"
                  : "Databases & Tools"}
              </Text>
              <Text style={styles.text}>PostgreSQL, SQLite</Text>
              <Text style={styles.text}>Git, GitHub, GitLab</Text>
              <Text style={styles.text}>Railway, Vercel, BunnyCDN</Text>
              <Text style={styles.text}>Ubuntu, VS Code, SAP</Text>
            </View>
          </View>
        </PDFSection>

        {/* Languages */}
        <PDFSection
          title={isGerman ? "Sprachen" : "Languages"}
        >
          <Text style={styles.text}>
            {isGerman
              ? "Englisch (fließend)"
              : "English (fluent)"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Deutsch (konversationssicher – B1/B2)"
              : "German (conversational – B1/B2)"}
          </Text>
          <Text style={styles.text}>
            {isGerman
              ? "Bengalisch (Muttersprache)"
              : "Bengali (native)"}
          </Text>
        </PDFSection>

        {/* Strengths */}
        <PDFSection
          title={isGerman ? "Persönliche Stärken" : "Strengths"}
        >
          <Text style={styles.text}>
            {isGerman
              ? "Zuverlässigkeit — Teamfähigkeit — Analytisches Denken — Problemlösung — Selbstmotivation"
              : "Reliability — Teamwork — Analytical thinking — Problem-solving — Self-motivation"}
          </Text>
        </PDFSection>
      </Page>
    </Document>
  );
}

function PDFSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>
      {children}
    </View>
  );
}
