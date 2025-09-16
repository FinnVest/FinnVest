-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'active',
    source VARCHAR(100) DEFAULT 'website'
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insert (for form submissions)
CREATE POLICY "Allow public insert" ON waitlist
    FOR INSERT WITH CHECK (true);

-- Create policy to allow public select (for checking duplicates)
CREATE POLICY "Allow public select" ON waitlist
    FOR SELECT USING (true);
