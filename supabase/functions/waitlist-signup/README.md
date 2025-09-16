# Waitlist Signup Edge Function

This Supabase Edge Function handles waitlist signups with email confirmation.

## Environment Variables Required

Set these environment variables in your Supabase project:

1. **PROJECT_URL** - Your Supabase project URL
2. **SERVICE_ROLE_KEY** - Your Supabase service role key (for admin operations)
3. **RESEND_API_KEY** - Your Resend API key for sending emails

## Database Schema

The function expects a `waiting_list` table with the following structure:

```sql
CREATE TABLE public.waiting_list (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  status text NULL DEFAULT 'active'::text,
  source text NULL DEFAULT 'website'::text,
  CONSTRAINT waiting_list_pkey PRIMARY KEY (id),
  CONSTRAINT waiting_list_email_key UNIQUE (email)
);

ALTER TABLE public.waiting_list ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert access" ON public.waiting_list FOR INSERT WITH CHECK (true);
```

## Usage

Send a POST request to the function endpoint:

```bash
curl -X POST https://your-project.supabase.co/functions/v1/waitlist-signup \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'
```

## Response

**Success (200):**
```json
{
  "message": "Successfully added to waitlist! Check your email for confirmation.",
  "email": "user@example.com"
}
```

**Error (400):**
```json
{
  "error": "This email is already on the list."
}
```

## Features

- ✅ CORS support for web requests
- ✅ Email validation
- ✅ Duplicate email handling
- ✅ Confirmation email via Resend
- ✅ Proper error handling
- ✅ TypeScript with Deno
