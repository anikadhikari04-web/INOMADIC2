import { Router } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

const router = Router();

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

router.post("/contact", async (req, res) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, message: "Invalid input. Please fill all fields correctly." });
    return;
  }

  const { name, email, message } = parsed.data;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`,
    replyTo: email,
    to: "innomadic.official@gmail.com",
    subject: `New Message from ${name} via INOMADIC Website`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #e0e0e0; padding: 32px; border-radius: 12px; border: 1px solid #1a1a1a;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #00ff88; font-size: 28px; margin: 0;">INOMADIC</h1>
          <p style="color: #666; margin: 8px 0 0 0;">New Website Inquiry</p>
        </div>
        <div style="background: #111; border-radius: 8px; padding: 24px; border: 1px solid #222;">
          <p style="margin: 0 0 8px 0;"><strong style="color: #00ff88;">Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong style="color: #00ff88;">Email:</strong> <a href="mailto:${email}" style="color: #00cc66;">${email}</a></p>
          <p style="margin: 8px 0 16px 0;"><strong style="color: #00ff88;">Message:</strong></p>
          <p style="margin: 0; line-height: 1.6; color: #ccc; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #444; font-size: 12px; text-align: center; margin: 24px 0 0 0;">Sent from INOMADIC website contact form</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Your message has been sent successfully! We will get back to you soon." });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
  }
});

export default router;
