// src/components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container text-center">
        <p>
          <a href="https://www.linkedin.com/in/bishwajit-karmaker/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{" "}
          |{" "}
          <a href="https://github.com/Bishwajit93" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{" "}
          |{" "}
          <a href="mailto:bish.karm123@gmail.com" className="hover:text-blue-400">
            Email
          </a>{" "}
          |{" "}
          <Link href="/resume" className="hover:text-blue-400">
            Resume
          </Link> {/* Resume Link */}
        </p>
        <p>&copy; {new Date().getFullYear()} Portfolio of Bishwajit Karmaker. All rights reserved.</p>
      </div>
    </footer>
  );
}
