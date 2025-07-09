import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full py-4 bg-black text-white shadow-lg">
            <nav className="container mx-auto flex justify-between items-center px-10">
                {/* Logo / Name on the left */}
                <div className="text-2xl font-bold nav-logo">
                    <Link href="/" className="hover:underline nav-logo-link">
                        Bishwajit Karmaker
                    </Link>
                </div>

                {/* Nav links on the right */}
                <ul className="flex space-x-8 nav-list">
                    <li className="nav-item">
                        <Link href="/" className="nav-link hover:underline">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/projects" className="nav-link hover:underline">Projects</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/experience" className="nav-link hover:underline">Experience</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/education" className="nav-link hover:underline">Education</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/contact" className="nav-link hover:underline">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
