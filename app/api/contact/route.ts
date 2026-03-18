// src/app/api/sendEmail/route.ts

import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { name, email, message, type, bookingDetails } = await request.json();

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const isBooking = type === 'booking';
    const brandColor = '#EAB308'; // Example brand yellow/gold
    
    // HTML Template Helper
    const getHtmlTemplate = (title: string, content: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
            .header { background-color: #111827; color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; color: ${brandColor}; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; }
            .content { padding: 30px; background-color: #ffffff; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
            .details-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .details-table th, .details-table td { padding: 12px; border-bottom: 1px solid #f3f4f6; text-align: left; }
            .details-table th { color: #6b7280; font-weight: 600; width: 35%; font-size: 13px; text-transform: uppercase; }
            .details-table td { color: #111827; font-weight: 500; }
            .button { display: inline-block; padding: 12px 24px; background-color: ${brandColor}; color: #000; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; }
            .message-box { background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-top: 20px; font-style: italic; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Jay's Taxi Moto</h1>
            </div>
            <div class="content">
              <h2 style="margin-top: 0; color: #111827;">${title}</h2>
              ${content}
            </div>
            <div class="footer">
              &copy; ${new Date().getFullYear()} Jay's Taxi Moto - Paris & Île-de-France<br>
              Available 24/7 • Professional & Secure
            </div>
          </div>
        </body>
      </html>
    `;

    // 1️⃣ Prepare Admin Content
    let adminContent = '';
    if (isBooking) {
      const detailsArray = (bookingDetails as string).split('\n');
      adminContent = `
        <p>A new booking request has been received from your website.</p>
        <table class="details-table">
          <tr><th>Client Name</th><td>${name}</td></tr>
          <tr><th>Client Email</th><td>${email}</td></tr>
          ${detailsArray.map(line => {
            const [label, ...valParts] = line.split(': ');
            if (!label || valParts.length === 0) return '';
            return `<tr><th>${label}</th><td>${valParts.join(': ')}</td></tr>`;
          }).join('')}
        </table>
      `;
    } else {
      adminContent = `
        <p>You have a new message from <strong>${name}</strong> (${email}):</p>
        <div class="message-box">"${message}"</div>
      `;
    }

    // Send email to ADMIN
    await transporter.sendMail({
      from: `"Jay's Transport Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: isBooking ? `New Booking Request from ${name}` : `New Message from ${name}`,
      html: getHtmlTemplate(isBooking ? 'Booking Request Details' : 'New Contact Message', adminContent),
    });

    // 2️⃣ Prepare User Content
    let userContent = '';
    if (isBooking) {
      userContent = `
        <p>Hi ${name},</p>
        <p>Thank you for choosing Jay's Taxi Moto. We have received your booking request and our team will contact you shortly to confirm.</p>
        <h3 style="color: #6b7280; font-size: 14px; text-transform: uppercase;">Your Booking Summary:</h3>
        <table class="details-table">
          ${(bookingDetails as string).split('\n').map(line => {
            const [label, ...valParts] = line.split(': ');
            if (!label || valParts.length === 0) return '';
            return `<tr><th>${label}</th><td>${valParts.join(': ')}</td></tr>`;
          }).join('')}
        </table>
        <p style="margin-top: 20px;">If you have any urgent questions, feel free to reply to this email or contact us via WhatsApp.</p>
      `;
    } else {
      userContent = `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to Jay's Taxi Moto. We have received your message and one of our team members will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <div class="message-box">"${message}"</div>
        <p style="margin-top: 20px;">Best regards,<br>The Jay's Taxi Moto Team</p>
      `;
    }

    // Send confirmation email to USER (don't let this failure block the whole response if admin mail succeeded)
    try {
      await transporter.sendMail({
        from: `"Jay's Transport" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: isBooking ? "We received your booking request" : "We received your message",
        html: getHtmlTemplate(isBooking ? 'Booking Received' : 'Message Received', userContent),
      });
    } catch (userMailError) {
      console.error('Error sending confirmation email to user:', userMailError);
      // We still return success: true because the admin received the notification
    }

    return NextResponse.json({ success: true, message: 'Emails sent' }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: error.message || 'Unknown error' }, { status: 500 });
  }
}