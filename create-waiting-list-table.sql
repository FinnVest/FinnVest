-- Create the waiting_list table for the Edge Function
CREATE TABLE IF NOT EXISTS public.waiting_list (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  status text NULL DEFAULT 'active'::text,
  source text NULL DEFAULT 'website'::text,
  CONSTRAINT waiting_list_pkey PRIMARY KEY (id),
  CONSTRAINT waiting_list_email_key UNIQUE (email)
);

-- Enable Row Level Security
ALTER TABLE public.waiting_list ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insert access
CREATE POLICY "Allow public insert access" ON public.waiting_list 
FOR INSERT WITH CHECK (true);

-- Create policy to allow public select access (for checking duplicates)
CREATE POLICY "Allow public select access" ON public.waiting_list 
FOR SELECT USING (true);
