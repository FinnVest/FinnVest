// Supabase Configuration
const SUPABASE_URL = 'https://sbcruleuzquwtvnjruwu.supabase.co'; // Reemplaza con tu URL de Supabase
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiY3J1bGV1enF1d3R2bmpydXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNTg4ODYsImV4cCI6MjA2NzgzNDg4Nn0.ZZY95GOUFBQKavqNFEOOeoDPpP2EhAgDQ43ukxyDOp8'; // Reemplaza con tu clave anónima

// Verificar que las credenciales estén configuradas
if (SUPABASE_URL === 'https://sbcruleuzquwtvnjruwu.supabase.co' || SUPABASE_ANON_KEY === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiY3J1bGV1enF1d3R2bmpydXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNTg4ODYsImV4cCI6MjA2NzgzNDg4Nn0.ZZY95GOUFBQKavqNFEOOeoDPpP2EhAgDQ43ukxyDOp8') {
    console.error('⚠️ Por favor configura las credenciales de Supabase en supabase-config.js');
    console.error('📖 Revisa SUPABASE_SETUP.md para las instrucciones');
}

// Inicializar Supabase
let supabase;
try {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} catch (error) {
    console.error('Error inicializando Supabase:', error);
}

// Función para agregar email a la waitlist
async function addToWaitlist(email) {
    if (!supabase) {
        return { success: false, error: 'Supabase no está configurado correctamente' };
    }
    
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

        if (error) {
            console.error('Error adding to waitlist:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: error.message };
    }
}

// Función para verificar si el email ya existe
async function checkEmailExists(email) {
    if (!supabase) {
        return { exists: false, error: 'Supabase no está configurado correctamente' };
    }
    
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

// Función para obtener estadísticas de la waitlist
async function getWaitlistStats() {
    if (!supabase) {
        return { success: false, error: 'Supabase no está configurado correctamente' };
    }
    
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

// Función para validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 