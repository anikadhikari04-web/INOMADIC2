import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Introduction",
      content: `Welcome to INOMADIC ("we", "our", "us"). We are a visual storytelling agency based in India, operating globally. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services. By using our website, you agree to the terms of this Privacy Policy. If you do not agree, please discontinue use of our website immediately.`,
    },
    {
      title: "2. Information We Collect",
      content: `We may collect personal information that you voluntarily provide when you fill out our contact or submission forms, including:
\n• Full name
\n• Email address
\n• Phone number (if provided)
\n• Message content
\n\nWe may also automatically collect non-personal technical data such as IP address, browser type, operating system, referring URLs, and pages visited, solely for website analytics and security purposes.`,
    },
    {
      title: "3. How We Use Your Information",
      content: `We use your information strictly to:
\n• Respond to your inquiries and service requests
\n• Send project-related communications
\n• Improve our website and services
\n• Comply with legal obligations
\n\nWe do not sell, trade, rent, or share your personal information with third parties for marketing purposes.`,
    },
    {
      title: "4. End-to-End Communication Security",
      content: `All messages submitted through our contact forms are transmitted using industry-standard encryption (TLS/SSL). We treat all communications as confidential. Your message content is used solely for the purpose of responding to your inquiry and is never shared, published, or disclosed to any unauthorized third party.`,
    },
    {
      title: "5. Prohibited Conduct — Strict Zero-Tolerance Policy",
      content: `By using this website and its contact/submission features, you expressly agree NOT to:

\n• Submit spam, unsolicited bulk messages, or automated bot submissions
\n• Attempt to hack, exploit, reverse-engineer, or gain unauthorized access to our systems, servers, databases, or infrastructure
\n• Send fraudulent, misleading, defamatory, threatening, or abusive messages
\n• Attempt phishing, social engineering, or identity fraud targeting INOMADIC or its team members
\n• Submit malware, scripts, or any malicious code via our forms or APIs
\n• Engage in any form of denial-of-service (DoS/DDoS) attacks
\n• Scrape, crawl, or systematically harvest data from our website without written permission
\n• Use our platform to distribute scam communications or deceptive commercial solicitations

\nViolation of any of the above will result in immediate termination of access, reporting to relevant authorities, and INOMADIC reserves the right to pursue full civil and criminal legal action under applicable Indian and international laws, including but not limited to the Information Technology Act, 2000 (India), the Indian Penal Code, and applicable international cybercrime treaties.`,
    },
    {
      title: "6. Data Retention",
      content: `We retain personal information only for as long as necessary to fulfill the purpose for which it was collected, or as required by law. Contact form submissions are retained for a period of up to 12 months, after which they are securely deleted.`,
    },
    {
      title: "7. Cookies",
      content: `Our website may use essential cookies to maintain site functionality. We do not use third-party tracking cookies or advertising cookies. You may disable cookies in your browser settings; however, some features of the website may not function properly as a result.`,
    },
    {
      title: "8. Third-Party Links",
      content: `Our website contains links to third-party platforms (social media profiles, etc.). We are not responsible for the privacy practices or content of those third-party websites. We encourage you to review their respective privacy policies.`,
    },
    {
      title: "9. Your Rights",
      content: `You have the right to:
\n• Request access to the personal data we hold about you
\n• Request correction or deletion of your personal data
\n• Withdraw consent for data processing at any time
\n\nTo exercise any of these rights, please contact us at innomadic.official@gmail.com.`,
    },
    {
      title: "10. Changes to This Policy",
      content: `We reserve the right to update this Privacy Policy at any time. Changes will be effective immediately upon posting to this page. Continued use of the website following any changes constitutes your acceptance of the updated policy.`,
    },
    {
      title: "11. Contact Us",
      content: `If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:\n\nEmail: innomadic.official@gmail.com\nPhone: +91 90466 84054\nLocation: India`,
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
            Privacy <span className="text-primary">Policy</span>
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
