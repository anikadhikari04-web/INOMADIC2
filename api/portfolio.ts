import { Resend } from 'resend';

export const config = {
  runtime: 'edge', // Using Edge Runtime to easily access native req.formData()
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    // Vercel Edge automatically decodes multipart/form-data
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const portfolioLink = formData.get('portfolioLink') as string;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let emailText = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    if (portfolioLink) {
       emailText += `\n\nPortfolio Link: ${portfolioLink}`;
    }

    const { data, error } = await resend.emails.send({
      from: 'INOMADIC Studio <onboarding@resend.dev>',
      to: ['innomadic.official@gmail.com'],
      subject: `New Portfolio Submission from ${name}`,
      text: emailText,
      // If we wished to process and attach files from formData.get('files'), 
      // we would attach them here as ArrayBuffers. 
      // Current deployment strictly handles the link to prevent Edge function timeouts.
    });

    if (error) {
      return new Response(JSON.stringify({ success: false, message: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Must return success: true because the modal explicitly expects { success: true }
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
