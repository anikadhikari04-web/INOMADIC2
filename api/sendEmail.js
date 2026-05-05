export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

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
    // 1️⃣ SEND EMAIL TO YOU
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
        templateId: 2,
        params: {
          name: name,
          email: email,
          message: message,
        },
      }),
    });

    const adminResult = await adminResponse.text();

    if (!adminResponse.ok) {
      console.error("Admin email error:", adminResult);
      return res.status(500).json({ error: adminResult });
    }

    // =========================
    // 2️⃣ SEND AUTO-REPLY
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
        templateId: 1,
        params: {
          name: name,
          email: email,
          message: message,
        },
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