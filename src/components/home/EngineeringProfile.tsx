import Link from "next/link";

const lanes = [
  { number: "01", title: "Backend foundations", text: "REST APIs, authentication, relational modelling, validation and business rules with Django and DRF." },
  { number: "02", title: "Product interfaces", text: "Responsive Next.js interfaces that expose complex workflows without exposing their complexity." },
  { number: "03", title: "Production ownership", text: "Deployment, debugging, integrations and the less glamorous work required to keep software usable after launch." },
];

export default function EngineeringProfile() {
  return (
    <section className="profile-section">
      <div className="profile-intro">
        <p className="eyebrow">How I work</p>
        <h2>Software is a system,<br />not a screenshot.</h2>
        <p>
          My mathematics background shaped how I approach software: break the problem down, make the rules explicit, test assumptions and keep the structure understandable.
        </p>
        <Link href="/experience" className="text-link">See experience →</Link>
      </div>

      <div className="profile-lanes">
        {lanes.map((lane) => (
          <article key={lane.number}>
            <span>{lane.number}</span>
            <div><h3>{lane.title}</h3><p>{lane.text}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
