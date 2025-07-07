// src/app/resume/page.tsx
export default function Resume() {
  return (
    <div className="resume-container">
      <h1 className="resume-title">Abdullah's Resume</h1>
      
      {/* Personal Info */}
      <section>
        <h2>Personal Information</h2>
        <p>Name: Abdullah</p>
        <p>Email: bish.karm123@gmail.com</p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/bishwajit-karmaker/">LinkedIn Profile</a></p>
        <p>GitHub: <a href="https://github.com/Bishwajit93">GitHub Profile</a></p>
      </section>

      {/* Skills */}
      <section>
        <h2>Skills</h2>
        <ul>
          <li>JavaScript / TypeScript</li>
          <li>React / Next.js</li>
          <li>Django / Python</li>
          <li>PostgreSQL</li>
          <li>HTML / CSS</li>
          {/* Add other skills here */}
        </ul>
      </section>

      {/* Experience */}
      <section>
        <h2>Experience</h2>
        <div>
          <h3>Full Stack Developer at XYZ Company</h3>
          <p>Duration: January 2023 - Present</p>
          <p>Responsibilities: Developed a full-stack web application using React and Django.</p>
        </div>
        {/* Add other experiences here */}
      </section>

      {/* Education */}
      <section>
        <h2>Education</h2>
        <div>
          <h3>Master’s in Scientific Computing - University ABC</h3>
          <p>Graduated: 2024</p>
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2>Projects</h2>
        <div>
          <h3>Project 1 - Portfolio Website</h3>
          <p>Description: A personal portfolio to showcase skills and projects.</p>
          <p>GitHub: <a href="https://github.com/Bishwajit93/portfolio">Portfolio Repo</a></p>
        </div>
        {/* Add other projects here */}
      </section>

      {/* Download Link */}
      <section>
        <a href="/resume.pdf" download>Download Resume</a>
      </section>
    </div>
  );
}
