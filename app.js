const supabaseUrl = "https://dbyzmxukmmiufnbtgwqq.supabase.co";
const supabaseAnonKey = "sb_publishable_idyta_QovGeRuSLej2ApIA_HMfbkYxD";

window.supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

async function getData() {
    try {
        const { data, error } = await window.supabase.from("users").select("*");
        if (error) throw error;
        console.log('Users from Supabase:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log('App initialized');
    await getData();
    
    // Load user if exists
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        updateUserDisplay(user);
    }
});



