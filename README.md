# Personal Portfolio – Frontend (Next.js + Tailwind CSS)

This is the frontend for **Bishwajit Karmaker's** full-stack portfolio, built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. It is fully responsive, animated, and deployed on Vercel. The site connects to a Django REST API backend for dynamic content (Projects, Experience, Education, Skills) and includes features like user authentication, contact form integration, and PDF resume download.

## 🔗 Live Website

🌐 [https://www.abdullahstack.com](https://www.abdullahstack.com)

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS + Custom CSS + Responsive Design
- **Animations**: Framer Motion
- **Forms**: Controlled React forms with validation
- **PDF Export**: `html2canvas` + `jsPDF`
- **Deployment**: Vercel (auto-deploy from GitHub)
- **Environment**: `.env.local` for API routes

---

## 📁 Project Structure

## 📁 Project Structure

```bash
portfolio_backend/
├── auth/           # Custom auth views (login, reset, forgot username)
├── projects/       # Project models, serializers, views
├── education/      # Education models, views
├── experience/     # Experience models, views
├── skills/         # Skill models, views
├── contact/        # Contact form handling
├── settings.py     # Env, CORS, email config, etc.
├── urls.py         # All endpoint routes
└── ...


---

## 🔐 Authentication

- **Protected Actions**: Add, edit, delete items (Projects, Skills, etc.) are only available to the site owner
- **Public Views**: All content is readable by visitors
- **Login**: JWT-based login system
- **Password Reset**: Custom email-based reset using Resend + Zoho
- **Forgot Username**: Email recovery option

---

## 📬 Contact Form

The contact form uses a Django REST API and Resend service to:

- Deliver the message to `contact@abdullahstack.com`
- CC a personal backup email
- Hide email address from spam bots
- Display real-time status messages

---

## 📄 Resume Page

- Dynamic toggle between **English** and **German** versions
- Downloadable as PDF (formatted using `html2canvas` + `jsPDF`)
- Content matches original CV exactly
- Optimized for print (white background, readable fonts)

---

## 🌍 Deployment

- **Frontend**: [Vercel](https://vercel.com/)
- **Domain**: [abdullahstack.com](https://www.abdullahstack.com) (custom connected)
- **CI/CD**: GitHub → Vercel (auto-build on push)

---

## 🔑 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-api-url.com/api

💡 Future Improvements

    - Theme toggle (Dark/Light)

    - Multilingual i18n routing

    - Lazy loading and performance optimization

🙌 Credits

    - Icons from react-icons

    - PDF rendering with jsPDF + html2canvas

    - Hosting via Vercel

    - Email by Resend + Zoho

Crafted with 🔥 by Bishwajit Karmaker

📃 License


This project is for personal use and learning. Contact me for permission to reuse.