export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-cyan-300 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p>
        This privacy policy explains how personal data is processed when you visit 
        this website (abdullahstack.com). I take data protection very seriously 
        and handle all personal information in accordance with the General Data 
        Protection Regulation (GDPR).
      </p>

      <h2 className="text-xl font-semibold mt-6">1. Responsible Person</h2>
      <p>
        Name: <strong>Bishwajit Karmaker</strong><br />
        Address: Wönnichstraße 03, 10317 Berlin, Germany<br />
        Email: contact@abdullahstack.com
      </p>

      <h2 className="text-xl font-semibold mt-6">2. Data Collected When Visiting This Website</h2>
      <p>
        When you access this website, certain information is automatically processed 
        by the hosting provider. This may include:
      </p>
      <ul className="list-disc ml-5">
        <li>IP address (anonymized where possible)</li>
        <li>Date and time of access</li>
        <li>Browser type and version</li>
        <li>Operating system</li>
      </ul>
      <p>
        This data is processed on the basis of Art. 6(1)(f) GDPR (legitimate interest) 
        to ensure technical functionality and stability of the website.
      </p>

      <h2 className="text-xl font-semibold mt-6">3. Contact Form</h2>
      <p>
        If you use the contact form, the following information is processed:
      </p>
      <ul className="list-disc ml-5">
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your message</li>
      </ul>
      <p>
        The data is transmitted to the email service provider Resend 
        (resend.com) to deliver your message securely.  
        This processing is based on Art. 6(1)(a) GDPR (your consent).
      </p>

      <h2 className="text-xl font-semibold mt-6">4. Email Delivery (Resend)</h2>
      <p>
        Emails sent through the contact form are processed by Resend.  
        Resend complies with modern security standards. You can find their 
        privacy information at: https://resend.com/legal/privacy
      </p>

      <h2 className="text-xl font-semibold mt-6">5. No Cookies / No Tracking</h2>
      <p>
        This website does not use:
      </p>
      <ul className="list-disc ml-5">
        <li>Analytics tracking</li>
        <li>Advertising cookies</li>
        <li>Behavioral profiling</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">6. Your Rights (GDPR)</h2>
      <p>You have the right to:</p>
      <ul className="list-disc ml-5">
        <li>request access to your personal data</li>
        <li>request deletion</li>
        <li>request correction</li>
        <li>withdraw consent for future processing</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">7. How Long Data Is Stored</h2>
      <p>
        Messages sent via the contact form are stored only as long as needed 
        to respond, and then deleted unless required for legitimate reasons.
      </p>

      <h2 className="text-xl font-semibold mt-6">8. Hosting Provider</h2>
      <p>
        The website is hosted using modern cloud platforms such as Railway or Vercel.  
        These providers may temporarily process technical information necessary 
        to deliver the website.
      </p>

      <h2 className="text-xl font-semibold mt-6">9. Changes to This Privacy Policy</h2>
      <p>
        This policy may be updated occasionally to meet legal requirements or reflect 
        functional changes of the website.
      </p>
    </main>
  );
}
