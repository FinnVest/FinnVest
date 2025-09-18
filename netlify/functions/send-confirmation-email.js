const { Resend } = require('resend');

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the request body
    const { email } = JSON.parse(event.body);

    // Validate email
    if (!email || typeof email !== 'string') {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Email is required' }),
      };
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Please provide a valid email address' }),
      };
    }

    // Send confirmation email using Resend
    const emailResult = await resend.emails.send({
      from: 'FinnVest <onboarding@resend.dev>',
      to: [normalizedEmail],
      subject: "¡Estás en la lista! 🎉",
      replyTo: 'finnvest.edu@gmail.com',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center;">¡Bienvenido a FinnVest! 🚀</h2>
          <p>¡Hola!</p>
          <p>¡Gracias por unirte a la lista de espera de <strong>FinnVest</strong>! Estamos emocionados de tenerte a bordo.</p>
          <p>Te contactaremos pronto cuando tengas acceso a nuestra plataforma donde podrás aprender a invertir sin miedo.</p>
          <p>Mientras tanto, síguenos en redes sociales para mantenerte actualizado:</p>
          <ul>
            <li>Instagram: @finnvest_edu</li>
            <li>LinkedIn: FinnVest Edu</li>
            <li>Facebook: FinnVest</li>
          </ul>
          <p>Saludos cordiales,<br>El Equipo de FinnVest</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            Estás recibiendo este email porque te registraste en nuestra lista de espera. 
            Si no te registraste, puedes ignorar este email de forma segura.
          </p>
        </div>
      `,
    });

    // Log email sending result
    console.log('Email sent successfully:', emailResult);
    console.log('Email sent to:', normalizedEmail);
    console.log('Email ID:', emailResult.data?.id);

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Email sent successfully',
        email: normalizedEmail,
        emailId: emailResult.data?.id,
      }),
    };

  } catch (error) {
    // Log error details
    console.error('Failed to send confirmation email:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);

    // Return error response
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Failed to send confirmation email',
        details: error.message,
      }),
    };
  }
};
