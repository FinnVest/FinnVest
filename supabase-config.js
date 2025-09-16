// Supabase Configuration
const SUPABASE_URL = 'https://jrieviopwhgvfjcefbtu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyaWV2aW9wd2hndmZqY2VmYnR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5ODA0NTQsImV4cCI6MjA3MzU1NjQ1NH0.vn9wM16v0CO8QW7NkC5b42jdxExoKpn34SvtBinDLvc';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Debug: Check if Supabase is loaded
console.log('🔧 Supabase client initialized:', supabase);
console.log('🔧 Supabase URL:', SUPABASE_URL);

// Function to add email to waitlist
async function addToWaitlist(email) {
    console.log('🚀 Attempting to add email to waitlist:', email);
    
    try {
        const { data, error } = await supabase
            .from('waitlist')
            .insert([
                { 
                    email: email.toLowerCase().trim(),
                    created_at: new Date().toISOString(),
                    status: 'active',
                    source: 'website'
                }
            ]);

        console.log('📊 Supabase response:', { data, error });

        if (error) {
            console.error('❌ Error adding to waitlist:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Successfully added to waitlist:', data);
        return { success: true, data };
    } catch (error) {
        console.error('❌ Exception in addToWaitlist:', error);
        return { success: false, error: error.message };
    }
}

// Function to check if email already exists
async function checkEmailExists(email) {
    try {
        const { data, error } = await supabase
            .from('waitlist')
            .select('email')
            .eq('email', email.toLowerCase().trim())
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            console.error('Error checking email:', error);
            return { exists: false, error: error.message };
        }

        return { exists: !!data, error: null };
    } catch (error) {
        console.error('Error:', error);
        return { exists: false, error: error.message };
    }
}

// Function to get waitlist statistics
async function getWaitlistStats() {
    try {
        const { data, error } = await supabase
            .from('waitlist')
            .select('*');

        if (error) {
            console.error('Error getting waitlist stats:', error);
            return { success: false, error: error.message };
        }

        const total = data.length;
        const today = data.filter(item => {
            const itemDate = new Date(item.created_at).toDateString();
            const currentDate = new Date().toDateString();
            return itemDate === currentDate;
        }).length;

        return { 
            success: true, 
            data: { total, today } 
        };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error.message };
    }
}
