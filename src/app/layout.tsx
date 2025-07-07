// src/app/layout.tsx
import Header from '@/components/Header';  // Import Header
import Footer from '@/components/Footer';  // Import Footer
import './globals.css';  // Global CSS import

const metadata = {
  title: 'Abdullahs Portfolio',
  description: 'Showcasing my skills, projects, and work experience.',
};

// Properly type children as React.ReactNode
const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <Header />  {/* Render Header */}
        <main>{children}</main>
        <Footer />  {/* Render Footer */}
      </body>
    </html>
  );
};

export default RootLayout;
