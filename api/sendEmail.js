export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // 🔥 Critical check (most people skip this)
  if (!process.env.BREVO_API_KEY) {
    return res.status(500).json({
      error: "Missing BREVO_API_KEY in environment variables"
    });
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
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

    const responseData = await response.text();

    if (!response.ok) {
      console.error("Brevo ERROR:", responseData);

      return res.status(500).json({
        error: responseData,
      });
    }

    console.log("Brevo SUCCESS:", responseData);

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Server ERROR:", error);

    return res.status(500).json({
      error: "Server crashed while sending email",
    });
  }
}
