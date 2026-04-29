export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // USER EMAIL
    const userRes = await fetch("https://api.brevo.com/v3/smtp/email", {
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

    const userData = await userRes.json();

    console.log("User email response:", userData);

    if (!userRes.ok) {
      throw new Error("User email failed");
    }

    // ADMIN EMAIL
    const adminRes = await fetch("https://api.brevo.com/v3/smtp/email", {
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

    const adminData = await adminRes.json();

    console.log("Admin email response:", adminData);

    if (!adminRes.ok) {
      throw new Error("Admin email failed");
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("FULL ERROR:", err);
    return res.status(500).json({ error: "Email failed", details: err.message });
  }
}
