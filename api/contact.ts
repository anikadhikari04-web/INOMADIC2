export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // Send confirmation to USER
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY as string,
      },
      body: JSON.stringify({
        to: [{ email }],
        templateId: 1,
        params: { name, message },
        sender: {
          email: "inomadic.official@gmail.com",
          name: "INOMADIC",
        },
        replyTo: {
          email,
          name,
        },
      }),
    });

    // Send notification to ADMIN
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY as string,
      },
      body: JSON.stringify({
        to: [{ email: "inomadic.official@gmail.com" }],
        templateId: 2,
        params: { name, email, message },
        sender: {
          email: "inomadic.official@gmail.com",
          name: "Website Bot",
        },
        replyTo: {
          email,
          name,
        },
      }),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Email failed" });
  }
}
