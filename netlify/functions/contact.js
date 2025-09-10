import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_test_key');

export async function handler(event, context) {
  try {
    console.log('Function called with method:', event.httpMethod);
    console.log('Environment variable check:', process.env.RESEND_API_KEY ? 'Key exists' : 'Key missing');
    console.log('Key length:', process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.length : 0);
    
    // Handle CORS preflight requests
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        }
      };
    }

    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.log('ERROR: RESEND_API_KEY not found in environment variables');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Email service not configured. Please add RESEND_API_KEY to environment variables.' })
      };
    }

    const body = JSON.parse(event.body);
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }

    // Send email
    console.log('Attempting to send email...');
    console.log('From: Portfolio Contact <onboarding@resend.dev>');
    console.log('To: dpithia97@gmail.com');
    console.log('Subject:', `Portfolio Contact: ${subject}`);
    
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'dpithia97@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log('Resend response:', { data, error });

    if (error) {
      console.error('Error sending email:', error);
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Failed to send email', details: error.message })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'Email sent successfully', data })
    };
  } catch (error) {
    console.error('Server error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}