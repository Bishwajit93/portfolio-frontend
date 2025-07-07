import Link from "next/link"

export default function Header() {
    return(
        <header className="header">
            <nav className="nav-container">
                <ul className="nav-Desktop">
                    <li className="nav-item">
                        <Link href="/" className="logo" >
                            Bishwajit Karmaker
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/" className="nav-link">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/projects" className="nav-link">Projects</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/experience" className="nav-link">Experience</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/education" className="nav-link">Education</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/contact" className="nav-link">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}