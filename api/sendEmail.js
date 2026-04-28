import { saveToSupabase } from "./lib/saveToSupabase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message, portfolio, type } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!process.env.BREVO_API_KEY) {
    return res.status(500).json({
      error: "Missing BREVO_API_KEY in environment variables",
    });
  }

  try {
    // =========================
    // 1️⃣ SAVE TO SUPABASE (must succeed before sending email)
    // =========================
    const dbResult = await saveToSupabase({
      name,
      email,
      message,
      portfolio: portfolio || null,
      type: type || "contact",
    });

    if (!dbResult.success) {
      console.error("Supabase save failed:", dbResult.error);
      return res.status(500).json({
        error: "Failed to save message. Please try again.",
      });
    }

    // =========================
    // 2️⃣ SEND EMAIL TO YOU
    // =========================
    const adminResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          email: "innomadic.official@gmail.com",
          name: "INOMADIC Website",
        },
        to: [
          {
            email: "innomadic.official@gmail.com",
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: "New Contact Message",
        textContent: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      }),
    });

    const adminResult = await adminResponse.text();

    if (!adminResponse.ok) {
      console.error("Admin email error:", adminResult);
      return res.status(500).json({ error: adminResult });
    }

    // =========================
    // 3️⃣ SEND AUTO-REPLY
    // =========================
    const userResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          email: "innomadic.official@gmail.com",
          name: "INOMADIC",
        },
        to: [
          {
            email: email,
            name: name,
          },
        ],
        subject: "We received your message",
        htmlContent: `
          <h2>Thank you for contacting us, ${name}!</h2>
          <p>We have received your message and will respond as soon as possible.</p>
          <br/>
          <p><b>Your message:</b></p>
          <p>${message}</p>
          <br/>
          <p>– INOMADIC Team</p>
        `,
      }),
    });

    const userResult = await userResponse.text();

    if (!userResponse.ok) {
      console.error("Auto-reply error:", userResult);
      // ⚠️ Do NOT fail entire request if auto-reply fails
    }

    // =========================
    // SUCCESS
    // =========================
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Server crash:", error);
    return res.status(500).json({
      error: "Server crashed while sending email",
    });
  }
}