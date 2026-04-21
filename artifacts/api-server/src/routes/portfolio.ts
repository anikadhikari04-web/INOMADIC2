import { Router } from "express";
import nodemailer from "nodemailer";
import multer from "multer";

const router = Router();

const MAX_FILE_SIZE = 15 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE, files: 10 },
});

router.post("/portfolio", upload.array("files", 10), async (req, res) => {
  try {
    const message = String(req.body.message ?? "").trim();
    const portfolioLink = String(req.body.portfolioLink ?? "").trim();
    const senderName = String(req.body.name ?? "Anonymous").trim() || "Anonymous";
    const senderEmail = String(req.body.email ?? "").trim();
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];

    if (!message) {
      res.status(400).json({ success: false, message: "Message is required." });
      return;
    }

    const wordCount = message.split(/\s+/).filter(Boolean).length;
    if (wordCount < 1 || wordCount > 300) {
      res.status(400).json({ success: false, message: "Message must be between 1 and 300 words." });
      return;
    }

    if (!portfolioLink && files.length === 0) {
      res.status(400).json({ success: false, message: "Please provide a portfolio link or upload files." });
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const safeLink = portfolioLink
      ? `<a href="${portfolioLink}" style="color: #00cc66; word-break: break-all;">${portfolioLink}</a>`
      : `<span style="color:#666">— not provided —</span>`;

    const filesListHtml = files.length
      ? files
          .map(
            (f) =>
              `<li style="margin:4px 0;color:#ccc;">${f.originalname} <span style="color:#666;">(${(f.size / 1024).toFixed(1)} KB)</span></li>`,
          )
          .join("")
      : `<li style="color:#666">— no files attached —</li>`;

    const mailOptions = {
      from: `"${senderName}" <${process.env.SMTP_USER}>`,
      replyTo: senderEmail || undefined,
      to: "innomadic.official@gmail.com",
      subject: `Portfolio Submission from ${senderName} via INOMADIC`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #e0e0e0; padding: 32px; border-radius: 12px; border: 1px solid #1a1a1a;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #00ff88; font-size: 28px; margin: 0;">INOMADIC</h1>
            <p style="color: #666; margin: 8px 0 0 0;">New Portfolio Submission</p>
          </div>
          <div style="background: #111; border-radius: 8px; padding: 24px; border: 1px solid #222;">
            <p style="margin: 0 0 8px 0;"><strong style="color: #00ff88;">From:</strong> ${senderName}${senderEmail ? ` &lt;${senderEmail}&gt;` : ""}</p>
            <p style="margin: 8px 0;"><strong style="color: #00ff88;">Portfolio Link:</strong> ${safeLink}</p>
            <p style="margin: 16px 0 8px 0;"><strong style="color: #00ff88;">Attached Files (${files.length}):</strong></p>
            <ul style="margin:0 0 16px 16px; padding:0;">${filesListHtml}</ul>
            <p style="margin: 16px 0 8px 0;"><strong style="color: #00ff88;">Message:</strong></p>
            <p style="margin: 0; line-height: 1.6; color: #ccc; white-space: pre-wrap;">${message.replace(/</g, "&lt;")}</p>
          </div>
          <p style="color: #444; font-size: 12px; text-align: center; margin: 24px 0 0 0;">Sent from INOMADIC website portfolio submission</p>
        </div>
      `,
      attachments: files.map((f) => ({
        filename: f.originalname,
        content: f.buffer,
        contentType: f.mimetype,
      })),
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Portfolio sent successfully! We'll review it soon." });
  } catch (err: unknown) {
    const e = err as { code?: string; message?: string };
    if (e?.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({ success: false, message: "File too large. Max 15 MB per file." });
      return;
    }
    req.log.error({ err }, "Failed to send portfolio submission");
    res.status(500).json({ success: false, message: "Failed to send portfolio. Please try again." });
  }
});

export default router;
