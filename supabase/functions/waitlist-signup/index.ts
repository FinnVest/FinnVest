import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'https://esm.sh/resend@2.0.0'

// CORS headers to allow requests from any origin
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// Environment variables for Supabase and Resend
const SUPABASE_URL = Deno.env.get('PROJECT_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SERVICE_ROLE_KEY')!
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// Initialize Resend client for sending emails
const resend = new Resend(RESEND_API_KEY)

// Main function handler
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      status: 200, 
      headers: corsHeaders 
    })
  }

  // Only allow POST requests for the main functionality
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }), 
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }

  try {
    // Parse the request body to get the email
    const { email } = await req.json()

    // Validate that email is provided
    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Email is required' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Normalize email (lowercase and trim)
    const normalizedEmail = email.toLowerCase().trim()

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid email address' }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Insert email into the waitlist table
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        { 
          email: normalizedEmail,
          created_at: new Date().toISOString(),
          status: 'active',
          source: 'website'
        }
      ])
      .select()

    // Handle database errors
    if (error) {
      // Check if it's a duplicate email error (unique constraint violation)
      if (error.code === '23505' || error.message.includes('duplicate key')) {
        return new Response(
          JSON.stringify({ error: 'This email is already on the list.' }), 
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Log other database errors for debugging
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to add email to waitlist' }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Send confirmation email using Resend
    try {
      const emailResult = await resend.emails.send({
        from: 'FinnVest <onboarding@resend.dev>',
        to: [normalizedEmail],
        subject: "You're on the list! 🎉",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; text-align: center;">Welcome to FinnVest! 🚀</h2>
            <p>Hi there,</p>
            <p>Thanks for joining the waiting list for <strong>FinnVest</strong>! We're excited to have you on board.</p>
            <p>We'll be in touch soon when you get access to our platform where you can learn to invest without fear.</p>
            <p>In the meantime, follow us on social media to stay updated:</p>
            <ul>
              <li>Instagram: @finnvest_edu</li>
              <li>LinkedIn: FinnVest Edu</li>
              <li>Facebook: FinnVest</li>
            </ul>
            <p>Best regards,<br>The FinnVest Team</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #666; text-align: center;">
              You're receiving this email because you signed up for our waitlist. 
              If you didn't sign up, you can safely ignore this email.
            </p>
          </div>
        `,
      })

      // Log email sending result for debugging
      console.log('Email sent successfully:', emailResult)
    } catch (emailError) {
      // Log email error but don't fail the entire request
      console.error('Failed to send confirmation email:', emailError)
      // Continue with success response even if email fails
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        message: 'Successfully added to waitlist! Check your email for confirmation.',
        email: normalizedEmail
      }), 
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    // Handle any unexpected errors
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
