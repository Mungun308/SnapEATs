console.log('Auth system loaded');

// Make functions available globally
window.showAuthModal = function() {
    console.log('Showing login modal');
    
    // Remove any existing modal
    const oldModal = document.querySelector('.login-modal');
    if (oldModal) oldModal.remove();
    
    // Create modal HTML
    const modalHTML = `
    <div class="login-modal" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    ">
        <div style="
            background: white;
            padding: 30px;
            border-radius: 10px;
            width: 90%;
            max-width: 400px;
            position: relative;
        ">
            <button onclick="this.closest('.login-modal').remove()" style="
                position: absolute;
                right: 15px;
                top: 10px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
            ">×</button>
            
            <h2 style="margin-bottom: 20px; color: #ffa500;">Нэвтрэх</h2>
            
            <div id="loginSection">
                <input type="text" id="loginInput" placeholder="Имэйл эсвэл нэр" style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                ">
                <input type="password" id="passwordInput" placeholder="Нууц үг" style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                ">
                <button onclick="login()" style="
                    width: 100%;
                    padding: 12px;
                    background: var(--color-yellow);
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                ">Нэвтрэх</button>
                <p style="text-align: center; margin-top: 10px;">
                    <a href="#" onclick="showSignup()" style="color:var(--color-yellow); text-decoration: none;">
                        Шинэ хэрэглэгч үү? Бүртгүүлэх
                    </a>
                </p>
            </div>
            
            <div id="signupSection" style="display: none;">
                <input type="text" id="signupName" placeholder="Бүтэн нэр" style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                ">
                <input type="text" id="signupUsername" placeholder="Хэрэглэгчийн нэр" style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                ">
                <input type="email" id="signupEmail" placeholder="Имэйл" style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                ">
                <input type="password" id="signupPassword" placeholder="Нууц үг" style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                ">
                <input type="password" id="signupPassword2" placeholder="Нууц үг давтах" style="
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                ">
                <button onclick="signup()" style="
                    width: 100%;
                    padding: 12px;
                    background:var(--color-orange);
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                ">Бүртгүүлэх</button>
                <p style="text-align: center; margin-top: 10px;">
                    <a href="#" onclick="showLogin()" style="color: var(--color-yellow); text-decoration: none;">
                        Аль хэдийн бүртгүүлсэн үү? Нэвтрэх
                    </a>
                </p>
            </div>
            
            <p id="errorMsg" style="color: red; text-align: center; margin-top: 10px;"></p>
        </div>
    </div>`;
    
    // Add to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

// Login function
window.login = async function() {
    const username = document.getElementById('loginInput').value;
    const password = document.getElementById('passwordInput').value;
    
    if (!username || !password) {
        document.getElementById('errorMsg').textContent = 'Бүх талбарыг бөглөнө үү!';
        return;
    }
    
    try {
        // Create user object
        const user = {
            username: username,
            email: username.includes('@') ? username : username + '@example.com',
            name: username,
            loggedIn: true,
            createdAt: new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Save to Supabase
        const { error } = await window.supabase
            .from('users')
            .upsert({
                username: user.username,
                email: user.email,
                name: user.name,
                created_at: user.createdAt
            }, { onConflict: 'email' });
        
        if (error) {
            console.error('Supabase error:', error);
            // Still continue even if Supabase fails
        }
        
        // Update UI
        updateUserDisplay(user);
        
        // Close modal
        const modal = document.querySelector('.login-modal');
        if (modal) modal.remove();
        
        alert('Амжилттай нэвтэрлээ!');
        
    } catch (error) {
        console.error('Login error:', error);
        document.getElementById('errorMsg').textContent = 'Нэвтрэхэд алдаа гарлаа';
    }
};

// Signup function
window.signup = async function() {
    const name = document.getElementById('signupName').value;
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const password2 = document.getElementById('signupPassword2').value;
    
    // Validation
    if (!name || !username || !email || !password || !password2) {
        document.getElementById('errorMsg').textContent = 'Бүх талбарыг бөглөнө үү!';
        return;
    }
    
    if (password !== password2) {
        document.getElementById('errorMsg').textContent = 'Нууц үг таарахгүй байна!';
        return;
    }
    
    try {
        // Check if user already exists in Supabase
        const { data: existingUsers, error: checkError } = await window.supabase
            .from('users')
            .select('email')
            .eq('email', email)
            .limit(1);
        
        if (checkError) throw checkError;
        
        if (existingUsers && existingUsers.length > 0) {
            document.getElementById('errorMsg').textContent = 'Имэйл аль хэдийн бүртгэлтэй!';
            return;
        }
        
        // Create user object with unique ID
        const userId = 'user_' + Date.now() + Math.random().toString(36).substr(2, 9);
        const user = {
            id: userId,
            username: username,
            email: email,
            name: name,
            loggedIn: true,
            createdAt: new Date().toISOString()
        };
        
        //localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));

        //supabase
        const { data, error } = await window.supabase
            .from('users')
            .insert([
                {
                    id: userId,
                    username: username,
                    email: email,
                    name: name,
                    created_at: new Date().toISOString()
                }
            ]);
        
        if (error) {
            console.error('Supabase insert error:', error);
            document.getElementById('errorMsg').textContent = 'Бүртгүүлэхэд алдаа гарлаа: ' + error.message;
            localStorage.removeItem('currentUser');
            return;
        }
        
        console.log('User saved to Supabase:', data);
        
        // Update UI
        updateUserDisplay(user);
        
        // Close modal
        const modal = document.querySelector('.login-modal');
        if (modal) modal.remove();
        
        alert('Амжилттай бүртгүүллээ!');
        
    } catch (error) {
        console.error('Signup error:', error);
        document.getElementById('errorMsg').textContent = 'Бүртгүүлэхэд алдаа гарлаа: ' + error.message;
    }
};

// Helper functions
window.showLogin = function() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('signupSection').style.display = 'none';
    document.getElementById('errorMsg').textContent = '';
};

window.showSignup = function() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('signupSection').style.display = 'block';
    document.getElementById('errorMsg').textContent = '';
};

// Update user display in UI
function updateUserDisplay(user) {
    console.log('User logged in:', user);
    // You can update UI elements here
    const userButton = document.querySelector('.icon button:last-child');
    if (userButton) {
        userButton.title = user.name || user.username;
    }
}