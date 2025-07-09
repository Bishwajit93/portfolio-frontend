'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import ContactForm from '@/components/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <p className="text-center mb-8">
        Whether you have an exciting project in mind, need a reliable developer for your next idea,
        or just want to connect — feel free to reach out. I am always open to collaborations,
        freelance opportunities, or even sharing insights and resources. Let us build something amazing together!
      </p>

      <div className="mb-10">
        <ContactForm />
      </div>

      <div className="flex flex-col gap-4 items-center">
        <div className="flex items-center gap-2">
          <FaGithub />
          <a href="https://github.com/Bishwajit93" target="_blank" rel="noopener noreferrer">
            github.com/Bishwajit93
          </a>
        </div>

        <div className="flex items-center gap-2">
          <FaLinkedin />
          <a href="https://www.linkedin.com/in/bishwajit-karmaker/" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/bishwajit-karmaker
          </a>
        </div>

        <div className="flex items-center gap-2">
          <FaEnvelope />
          <a href="mailto:bish.karm123@gmail.com">
            bish.karm123@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
