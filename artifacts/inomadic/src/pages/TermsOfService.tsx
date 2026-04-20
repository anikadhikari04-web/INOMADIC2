import { motion } from "framer-motion";

export default function TermsOfService() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing or using the INOMADIC website ("Site") and its services, you agree to be legally bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must immediately cease use of this website. INOMADIC reserves the right to modify these Terms at any time, with changes effective upon posting. Continued use of the Site constitutes acceptance of any revised Terms.`,
    },
    {
      title: "2. Description of Services",
      content: `INOMADIC is a professional visual storytelling agency offering services including but not limited to:
\n• Brand film production
\n• Commercial photography
\n• Motion graphics and animation
\n• Digital content creation
\n• Visual identity design
\n\nAll services are subject to separate project agreements or contracts entered into between INOMADIC and the client.`,
    },
    {
      title: "3. Use of This Website",
      content: `You agree to use this website only for lawful purposes. You must not use this Site in any way that:
\n• Violates any applicable local, national, or international law or regulation
\n• Is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, or invasive of another's privacy
\n• Involves sending or procuring unsolicited commercial communications (spam)
\n• Impersonates any person or entity or misrepresents your affiliation with any person or entity
\n• Interferes with or disrupts the Site or servers or networks connected to the Site`,
    },
    {
      title: "4. Prohibited Activities — Zero-Tolerance Enforcement",
      content: `The following activities are strictly prohibited and will result in immediate legal action:

\n HACKING & UNAUTHORIZED ACCESS
\nAny attempt to gain unauthorized access to our website, backend servers, databases, email systems, or any part of our digital infrastructure — including but not limited to brute-force attacks, SQL injection, cross-site scripting (XSS), or exploiting known vulnerabilities — is a criminal offence and will be prosecuted to the fullest extent of the law under the Information Technology Act, 2000 (India) and applicable international cybercrime legislation.

\n SPAM & UNSOLICITED MESSAGING
\nSubmitting spam, bulk automated messages, or promotional content through our contact or submission forms without prior consent is strictly prohibited. Any such activity will result in IP blocking, blacklisting, and may be reported to anti-spam authorities.

\n SCAM & FRAUDULENT COMMUNICATIONS
\nSending deceptive, fraudulent, or scam communications through our platform — including fake business inquiries, phishing attempts, or misleading commercial proposals — is a criminal act. INOMADIC will report all such incidents to the Cyber Crime Cell of India and relevant international law enforcement agencies.

\n DEFAMATION & HARASSMENT
\nSending threatening, harassing, defamatory, or abusive messages to INOMADIC team members via our website is prohibited. Legal action will be taken under applicable provisions of the Indian Penal Code and Information Technology Act.

\nViolations may result in civil liability, criminal prosecution, injunctions, and claims for damages including legal costs.`,
    },
    {
      title: "5. Intellectual Property",
      content: `All content on this website — including text, images, videos, logos, graphics, animations, and code — is the exclusive intellectual property of INOMADIC or its licensed creators, and is protected by Indian and international copyright law.

\nYou may not:
\n• Copy, reproduce, distribute, or create derivative works from any content without express written permission from INOMADIC
\n• Use INOMADIC's name, logo, or branding for any commercial purpose
\n• Download or repurpose portfolio content for any unauthorized use

\nUnauthorized use of our intellectual property will result in immediate legal action.`,
    },
    {
      title: "6. Submission Forms & Contact",
      content: `By submitting information through our contact or submission forms, you:
\n• Confirm the information provided is accurate and truthful
\n• Consent to INOMADIC using that information to respond to your inquiry
\n• Acknowledge that submitting false, misleading, or malicious content is prohibited and actionable

\nINOMADIC is not responsible for delays in response. Submitting a form does not constitute a binding service agreement.`,
    },
    {
      title: "7. Disclaimer of Warranties",
      content: `This website and its content are provided on an "as is" and "as available" basis. INOMADIC makes no representations or warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.

\nWe do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.`,
    },
    {
      title: "8. Limitation of Liability",
      content: `To the maximum extent permitted by applicable law, INOMADIC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of (or inability to use) this website or its services, even if advised of the possibility of such damages.`,
    },
    {
      title: "9. Governing Law & Jurisdiction",
      content: `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in India. By using this website, you consent to the personal jurisdiction of such courts.`,
    },
    {
      title: "10. Termination",
      content: `INOMADIC reserves the right, at its sole discretion, to terminate or suspend your access to the website immediately, without prior notice or liability, for any reason whatsoever, including if you breach these Terms.`,
    },
    {
      title: "11. Contact",
      content: `For questions regarding these Terms of Service, please contact us:\n\nEmail: innomadic.official@gmail.com\nPhone: +91 90466 84054\nLocation: India`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="container mx-auto px-6 md:px-12 py-20 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-primary tracking-widest uppercase mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-gray-500 text-sm mb-12">Last updated: April 20, 2026</p>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 md:p-8"
              >
                <h2 className="text-lg font-semibold text-primary mb-4">{section.title}</h2>
                <p className="text-gray-400 leading-relaxed text-sm whitespace-pre-line">{section.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} INOMADIC. All rights reserved.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
