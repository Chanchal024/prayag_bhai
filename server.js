import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const gmailUser = process.env.GMAIL_USER || 'prayagdas2003@gmail.com';
const gmailPass = process.env.GMAIL_APP_PASSWORD;

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailUser,
    pass: gmailPass,
  },
});

// Verify connection on startup
if (!gmailPass || gmailPass === 'your_16_char_app_password_here') {
  console.warn('\n⚠️  ACTION REQUIRED: Set GMAIL_APP_PASSWORD in your .env file with your 16-character Google App Password to enable mail sending.\n');
} else {
  transporter.verify()
    .then(() => console.log('✅ Gmail SMTP connected successfully with ' + gmailUser))
    .catch((err) => console.error('❌ Gmail SMTP connection failed:', err.message));
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, service, projectType, budget, timeline, message } = req.body;

  // Server-side validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  if (!gmailPass || gmailPass === 'your_16_char_app_password_here') {
    console.error('❌ Cannot send email: GMAIL_APP_PASSWORD is not set in .env');
    return res.status(500).json({
      error: 'Mail server not configured yet. Please add your 16-character Google App Password in .env.'
    });
  }

  const selectedService = service || projectType || 'Not specified';

  const mailOptions = {
    from: `"${name}" <${gmailUser}>`,
    to: gmailUser,
    replyTo: email,
    subject: `New Inquiry from ${name} – Prayag Das Studio`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #111; border-bottom: 2px solid #ea580c; padding-bottom: 10px;">
          New Studio Inquiry
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #555; width: 140px;">Name</td>
            <td style="padding: 8px 12px;">${name}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 8px 12px; font-weight: bold; color: #555;">Email</td>
            <td style="padding: 8px 12px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #555;">Phone</td>
            <td style="padding: 8px 12px;">${phone || 'Not provided'}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 8px 12px; font-weight: bold; color: #555;">Service / Project</td>
            <td style="padding: 8px 12px;">${selectedService}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; color: #555;">Budget</td>
            <td style="padding: 8px 12px;">${budget || 'Not specified'}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 8px 12px; font-weight: bold; color: #555;">Timeline</td>
            <td style="padding: 8px 12px;">${timeline || 'Not provided'}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-left: 4px solid #ea580c;">
          <strong style="color: #555;">Message:</strong>
          <p style="margin: 8px 0 0; color: #333; line-height: 1.6;">${message}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #999;">
          This message was sent from the studio website contact form.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent from ${name} (${email})`);
    res.json({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`📧 Mail server running at http://localhost:${PORT}`);
});
